import { Request, Response } from "express";
import { Prismaclient } from "../constants/db";

export const getOrders = async (_req: Request, res: Response) => {
  const data = await Prismaclient.pedidos.findMany({
    select: {
      detallespedidos: {
        select: {
          distribuidor: {
            select: {
              nombrecompleto: true,
              empresa: true,
            },
          },
          precioventa: true,
        },
      },
      fechaPedido: true,
    },
  });


  const dataParse = data.map((res) => ({
    fechaPedido: res.fechaPedido,
    nombreDistribuidor: res.detallespedidos.map(
      (res) => res.distribuidor.nombrecompleto
    )[0],
    empresa: res.detallespedidos.map((res) => res.distribuidor.empresa)[0],
    total: res.detallespedidos
      .map((rest) => rest.precioventa)
      .reduce((acc, curr) => Number(acc) + Number(curr), 0),
    
  }));
  res.json(dataParse);
};
