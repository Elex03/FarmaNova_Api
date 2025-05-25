import { Prismaclient } from "../../../constants/db";
import { Request, Response } from "express";

export const getMakeSales = async (_req: Request, res: Response) => {
  const data = await Prismaclient.medicamento.findMany({
    select: {
      medicamento_pk: true,
      stock: true,
      precioVenta: true,
      descripcion: true,
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
    accionTera: res.accionmedicamentos.map(
      (tera) => tera.accionTera.descripcion
    )[0],
    fabricante: res.detallespedidos.map(
      (fabri) => fabri.pedidos.distribuidor.empresa.descripcion
    )[0],
    stock: res.stock,
    precioVenta: Number(res.precioVenta),
  }));
  res.send({ data: parseData, headers: Headers });
};
