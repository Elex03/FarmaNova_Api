import { Prismaclient } from "../constants/db";
import { Request, Response } from "express";

export const createDistributor = async (req: Request, res: Response) => {
  const { nombrecompleto, telefono, empresa } = req.body;

  const data = await Prismaclient.distribuidor.create({
    data: {
      nombrecompleto,
      telefono,
      empresa,
    },
  });

  res.send(data);
};

export const getdistributors = async (_req: Request, res: Response) => {
  const data = await Prismaclient.distribuidor.findMany({
    select: {
      distribuidor_pk: true,
      nombrecompleto: true,
      empresa: true,
      telefono: true,
      detallespedidos: {
        select: {
          fechacompra: true,
        },
      },
    },
  });


  const dataParse = data.map((res) => ({
    nombre: res.nombrecompleto,
    empresa: res.empresa,
    telefono: res.telefono,
    fechaCompra: res.detallespedidos.map((res) => res.fechacompra).slice(-1)[0]
  }));

  res.send(dataParse);
};
