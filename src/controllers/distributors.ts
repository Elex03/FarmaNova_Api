import { Prismaclient } from "../constants/db";
import { Request, Response } from "express";

export const createDistributor = async (req: Request, res: Response) => {
  const { nombrecompleto, telefono, empresa } = req.body;

  const empresa_valid = await Prismaclient.empresa.findFirst({
    where: {
      descripcion: empresa,
    },
  });

  if (!empresa_valid) {
    console.log("Nueva empresa a registrar");
    const data = await Prismaclient.distribuidor.create({
      data: {
        nombrecompleto,
        telefono,
        empresa: {
          create: {
            descripcion: empresa,
          },
        },
      },
    });
    res.send(data);
  } else {
    const data = await Prismaclient.distribuidor.create({
      data: {
        nombrecompleto,
        telefono,
        empresa_fk: empresa_valid.empresa_pk,
      },
    });
    res.send(data);
  }
};

export const getdistributors = async (_req: Request, res: Response) => {
  const data = await Prismaclient.distribuidor.findMany({
    select: {
      distribuidor_pk: true,
      nombrecompleto: true,
      empresa: true,
      telefono: true,
      pedidos: {
        select: {
          fechaPedido: true
        }
      }
    },
  });

  const dataParse = data.map((res) => ({
    nombre: res.nombrecompleto,
    empresa: res.empresa.descripcion,
    telefono: res.telefono,
    ultimoPedido: res.pedidos.map((res) => res.fechaPedido).slice(-1)[0]?.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }),
    id: res.distribuidor_pk,
  }));

  res.send(dataParse);
};


export const getListDistributors = async(_req: Request, res: Response) => {

  const data = await Prismaclient.distribuidor.findMany({
    select: {
      distribuidor_pk: true, 
      nombrecompleto: true,
    }
  })

  const dataParse = data.map((res) => ({
    id: res.distribuidor_pk, 
    label: res.nombrecompleto
  }))
  res.send(dataParse);
}