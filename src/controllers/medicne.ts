import { Request, Response } from "express";
import { Prismaclient } from "../constants/db"; // Asegúrate de que esta ruta esté correcta
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadPath = "./uploads";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath); // Crear la carpeta si no existe
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
  // Usamos upload.array('image') para manejar las imágenes
  upload.array("image")(req, res, async () => {
    try {
      // Las imágenes se encuentran en req.files
      const imagenes = (req.files as Express.Multer.File[]).map(
        (file) => file.path // Aquí estamos obteniendo las rutas de las imágenes
      );

      // Los datos adicionales se encuentran en req.body
      const {
        idMedicamento,
        idDistribuidor,
        formaComprimida,
        codigoBarra,
        precioVenta,
        precioCompra,
        cantidad,
      } = req.body;

      // Ahora, debes manejar estos datos como arreglos
      // Asegúrate de que todos los datos de los medicamentos se están procesando correctamente
      // por ejemplo, para el primer medicamento:
      for (let index = 0; index < idMedicamento.length; index++) {
        const createOrder = await Prismaclient.pedidos.create({
          data: {
            distribuidor_fk: idDistribuidor[index], // Asociar el distribuidor al medicamento
            estado: "COMPLETADO",
            fechaEntrega: new Date(),
            empleado_fk: 1, // Asume un empleado fijo o agrega el campo correspondiente
            fechaPedido: new Date(),
            
          },
        });

        if (createOrder) {
          await Prismaclient.variante.createMany({
            data: {
              codigoBarra: codigoBarra[index],
              precioVenta: precioVenta[index],
              stock: cantidad[index],
              imagen: imagenes[index],
              forma_fk: formaComprimida[index],
              EstadoMedicamento: 'DISPONIBLE',
              EstadoMedicamentoExpirado: 'EXPIRADO', // Replace with appropriate value
              medicamento_fk: idMedicamento[index], // Ensure this is correctly mapped
            },
          });
        }
      }

      // Responder con éxito
      res.status(200).json({ message: "Medicamentos creados con éxito" });
    } catch (error) {
      console.error("Error al crear el producto:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });
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
