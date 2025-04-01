import { Request, Response } from "express";
import { Prismaclient } from "../constants/db"; 
import multer from "multer";
import fs from "fs";
import { EstadoMedicamento } from "@prisma/client";

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

export const getRegisterPerBarCode = async (req: Request, res: Response) => {
  const data = await Prismaclient.detallespedidos.findFirst({
    where: {
      variantes: {
        codigoBarra: req.params.id,
      },
    },
    select: {
      precioventa: true,
      fecha_expiracion: true,
      pedidos: {
        select: {
          distribuidor: {
            select: {
              nombrecompleto: true,
            },
          },
        },
      },
      variantes: {
        select: {
          variante_pk: true,
          imagen: true,
          formaFarmaceutica: true,
          medicamento: {
            select: {
              nombreComercial: true,
            },
          },
          codigoBarra: true,
          precioVenta: true,
        },
      },
    },
  });

  if (data) {
    const dataParse = {
      key: data?.variantes.variante_pk,
      medicamento: data?.variantes.medicamento.nombreComercial,
      distribuidor: data?.pedidos.distribuidor.nombrecompleto,
      codigoBarra: data?.variantes.codigoBarra,
      precioVenta: data?.variantes.precioVenta,
      precioCompra: data?.precioventa,
      cantidad: 0,
      fechaVencimiento: data?.fecha_expiracion,
    };

    res.status(200).send({ message: "Data was found", data: dataParse });
  } else {
    res.status(412).send({ message: "Data not found" });
  }
};
``;

export const getCatalogMedicines = async (_req: Request, res: Response) => {
  try {
    const data = await Prismaclient.variante.findMany({
      select: {
        requierePrescripcion: true,
        medicamento: {
          select: {
            nombreComercial: true,
            concentracion: true,
          },
        },
        variante_pk: true,
        stock: true,
        precioVenta: true,
        formaFarmaceutica: {
          select: {
            nombre: true,
          },
        },
        detallespedidos: {
          select: {
            pedidos: {
              select: {
                distribuidor: {
                  select: {
                    empresa: {
                      select: {
                        descripcion: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const dataParse = data.map((res) => ({
      descripcion:
        res.medicamento.nombreComercial +
        " " +
        res.formaFarmaceutica.nombre +
        " " +
        res.medicamento.concentracion,
      maxCantidad: res.stock,
      cantidad: 0,
      precio: Number(res.precioVenta),
      id: res.variante_pk,
      empresa:
        res.detallespedidos[0]?.pedidos.distribuidor.empresa.descripcion ||
        "No disponible",
      requierePrescripcion: res.requierePrescripcion,
    }));

    res.json(dataParse);
  } catch (error) {
    console.error("Error al obtener medicamentos:");
    res.status(500).json({ error: "Error al obtener los medicamentos" });
  }
};
export const createSales = async (req: Request, res: Response) => {
  const { cliente } = req.body;

  let clienteId = 0;

  try {
    if (cliente) {
      const existingClient = await Prismaclient.cliente.findFirst({
        where: {
          cedula: cliente,
        },
      });
      if (!existingClient) {
        const newClient = await Prismaclient.cliente.create({
          data: {
            cedula: cliente,
          },
        });
        clienteId = newClient?.cliente_pk;
      } else {
        clienteId = existingClient?.cliente_pk;
      }
    }

    if (!cliente) {
      clienteId = 3;
    }
    const data = await Prismaclient.ventas.create({
      data: {
        cliente_fk: Number(clienteId),
        empleado_fk: 1,
        fechaventa: new Date(),
        estado: "COMPLETADO",
      },
    });

    const dataDetalles = await Prismaclient.detallesventa.createMany({
      data: req.body.detalles.map((res: { id: number; cantidad: number }) => ({
        variante_fk: res.id,
        cantidad: res.cantidad,
        ventas_fk: data.ventas_pk,
      })),
    });

    if (dataDetalles) {
      await Promise.all(
        req.body.detalles.map(async (detalle: { id: number; cantidad: number }) => {
          // Obtener el stock actual del producto antes de actualizarlo
          const producto = await Prismaclient.variante.findUnique({
            where: { variante_pk: detalle.id },
            select: { stock: true },
          });
    
          if (!producto) return; // Si el producto no existe, salir
    
          const nuevoStock = producto.stock - detalle.cantidad;
    
          // Determinar el estado según el nuevo stock
          let nuevoEstado: EstadoMedicamento = EstadoMedicamento.DISPONIBLE;
          if (nuevoStock === 0) {
            nuevoEstado = EstadoMedicamento.AGOTADO;
          } else if (nuevoStock < 20) {
            nuevoEstado = EstadoMedicamento.PROXIMO_A_AGOTARSE;
          }
    
          // Actualizar el stock y el estado
          await Prismaclient.variante.update({
            where: { variante_pk: detalle.id },
            data: {
              stock: { decrement: detalle.cantidad },
              EstadoMedicamento: nuevoEstado,
            },
          });
        })
      );
    } else {
      await Prismaclient.ventas.delete({
        where: {
          ventas_pk: data.ventas_pk,
        },
      });
    }

    res
      .status(200)
      .json({ message: "Venta creada exitosamente", dataDetalles });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al crear o buscar el cliente.", error: error });
  }
};
