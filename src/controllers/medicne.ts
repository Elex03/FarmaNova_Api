import { Request, Response } from "express";
import { Prismaclient } from "../constants/db"; // Asegúrate de que esta ruta esté correcta
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadPath = "./uploads";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export const createProduct = (req: Request, res: Response) => {
  upload.array("image")(req, res, async () => {
    try {
      // Las imágenes se encuentran en req.files
      const imagenes = (req.files as Express.Multer.File[]).map(
        (file) => file.path // Aquí estamos obteniendo las rutas de las imágenes
      );

      const {
        idMedicamento,
        idDistribuidor,
        formaComprimida,
        codigoBarra,
        precioVenta,
        cantidad,
        fechaVencimiento,
      } = req.body;

      for (let index = 0; index < idMedicamento.length; index++) {
        const createOrder = await Prismaclient.pedidos.create({
          data: {
            distribuidor_fk: Number(idDistribuidor[index]),
            estado: "COMPLETADO",
            fechaEntrega: new Date(),
            empleado_fk: 1,
            fechaPedido: new Date(),
          },
        });

        if (createOrder) {
          const createVariant = await Prismaclient.variante.create({
            data: {
              codigoBarra: codigoBarra[index],
              precioVenta: precioVenta[index],
              stock: Number(cantidad[index]),
              imagen: imagenes[index],
              forma_fk: Number(formaComprimida[index]),
              EstadoMedicamento: "DISPONIBLE",
              EstadoMedicamentoExpirado: "EXPIRADO", // Replace with appropriate value
              medicamento_fk: Number(idMedicamento[index]), // Ensure this is correctly mapped
            },
          });

          if (createVariant) {
            await Prismaclient.detallespedidos.create({
              data: {
                variante_fk: createVariant.variante_pk,
                pedidos_fk: createOrder.pedidos_pk,
                cantidad: Number(cantidad[index]),
                precioventa: Number(precioVenta[index]),
                fecha_expiracion: new Date(fechaVencimiento[index]),
              },
            });
          }
        }
      }

      res.status(200).json({ message: "Medicamentos creados con éxito" });
    } catch (error) {
      console.error("Error al crear el producto:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });
};
export const getRegisterPerBarCode = async (req: Request, res: Response) => {
  const data = await Prismaclient.variante.findFirst({
    where: {
      codigoBarra: req.params.id,
    },
  });
  
  data
    ? res.status(200).send({ message: "Data was found" })
    : res.status(412).send({ message: "Data not found" });
};

export const getMedicines = async (_req: Request, res: Response) => {
  const data = await Prismaclient.medicamentos.findMany({
    select: {
      nombreComercial: true,
      concentracion: true,
      medicamento_pk: true,
    },
  });

  const dataParse = data.map((res) => ({
    id: res.medicamento_pk,
    label: res.nombreComercial + " - " + res.concentracion,
  }));
  res.send(dataParse);
};
export const createMedicine = async (req: Request, res: Response) => {
  try {
    const { nombreComercial, nombreGenerico, concentracion, categories } =
      req.body;

    const data = await Prismaclient.medicamentos.create({
      data: {
        nombreComercial,
        nombreGenerico,
        concentracion,
        fechaCreacion: new Date(),
        fechaModificacion: new Date(),
      },
    });

    // Verificar si hay categorías
    if (data && categories && categories.length > 0) {
      const dataAccionTera = await Prismaclient.accionmedicamentos.createMany({
        data: categories.map((category: { id: number }) => ({
          medicamento_fk: data.medicamento_pk,
          accionTerapeutica_fk: Number(category.id),
        })),
      });

      res.status(201).json({
        message: "Medicamento creado con éxito",
        medicamento: data,
        accionesTerapeuticas: dataAccionTera,
      });
    } else {
      await Prismaclient.medicamentos.delete({
        where: {
          medicamento_pk: data.medicamento_pk,
        },
      });
      res.status(400).json({
        message:
          "Medicamento creado pero sin acciones terapéuticas, operación no válida",
      });
    }
  } catch (error) {
    console.error("Error al crear el medicamento:", error);
    // Error 500 si algo falla en el servidor
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
// const getMedicines = async (_req: Request, res: Response) => {
//   try {
//     const data = await Prismaclient.variante.findMany({
//       select: {
//         medicamento: {
//           select: {
//             nombreComercial: true,
//           },
//         },
//         variante_pk: true,
//         stock: true,
//         concentracion: true,
//         precioVenta: true,
//         presentacion: {
//           select: {
//             nombre: true,
//           },
//         },
//         detallespedidos: {
//           select: {
//             distribuidor: {
//               select: {
//                 nombrecompleto: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     // Mapear los datos para devolverlos en el formato esperado
//     const dataParse = data.map((res) => ({
//       descripcion:
//         res.medicamento.nombreComercial +
//         " " +
//         res.presentacion.nombre +
//         " " +
//         res.concentracion,
//       maxCantidad: res.stock,
//       precio: res.precioVenta,
//       id: res.variante_pk,
//       distribuidor:
//         res.detallespedidos[0]?.distribuidor.nombrecompleto || "No disponible",
//     }));

//     res.json(dataParse); // Asegúrate de usar .json para enviar la respuesta correctamente
//   } catch (error) {
//     console.error("Error al obtener medicamentos:");
//     res.status(500).json({ error: "Error al obtener los medicamentos" });
//   }
// };

// export default getMedicines;
