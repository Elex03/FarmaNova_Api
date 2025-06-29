import { Prismaclient } from "../../../constants/db";
import { Request, Response } from "express";

export const getMakeSales = async (_req: Request, res: Response) => {
  const data = await Prismaclient.medicamento.findMany({
    select: {
      medicamento_pk: true,
      stock: true,
      precioVenta: true,
      descripcion: true,
      imagen: true,
      empresa: {
        select: {
          descripcion: true,
        },
      },
      accionmedicamentos: {
        select: {
          accionTera: {
            select: {
              descripcion: true,
            },
          },
        },
      },
      detallespedidos: {
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
    where: {
      stock: {
        not: 0,
      },
    },
  });

  const Headers = [
    { key: "descripcion", header: "Descripcion" },
    { key: "accionTera", header: "Accion terapeutica" },
    { key: "fabricante", header: "Fabricante" },
    { key: "stock", header: "Cantidades disponibles" },
    { key: "precioVenta", header: "Coste" },
  ];

  const parseData = data.map((res) => ({
    id: res.medicamento_pk,
    descripcion: res.descripcion,
    imagenUrl: res.imagen ? `${res.imagen}` : "./uploads/NF.jpg",
    accionTera: res.accionmedicamentos.map(
      (tera) => tera.accionTera.descripcion
    )[0],
    fabricante: res.empresa.descripcion,
    stock: res.stock,
    precioVenta: Number(res.precioVenta),
  }));
  res.send({ data: parseData, headers: Headers });
};

export const getItemPerCode = async (req: Request, res: Response) => {
  const code = req.params.code;

  const data = await Prismaclient.medicamento.findFirst({
    select: {
      medicamento_pk: true,
      stock: true,
      precioVenta: true,
      descripcion: true,
      imagen: true,
      empresa: {
        select: {
          descripcion: true,
        },
      },
      accionmedicamentos: {
        select: {
          accionTera: {
            select: {
              descripcion: true,
            },
          },
        },
      },
    },
    where: {
      codigoBarra: code,
    },
  });
  if (!data) {
    res.status(200).send({
      success: false,
      message: "Producto no encontrado",
      data: null,
    });
  } else {
    res.status(200).send({
      success: true,
      data: {
        id: data.medicamento_pk,
        name: data.descripcion,
        
        // accionTera:
        //   data.accionmedicamentos?.[0]?.accionTera?.descripcion ||
        //   "No especificado",
        // fabricante: data.empresa?.descripcion || "Desconocido",
        stock: data.stock,
        price: Number(data.precioVenta),
      },
    });
  }
};
