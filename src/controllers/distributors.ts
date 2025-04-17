import { Prismaclient } from "../constants/db";
import { Request, Response } from "express";

export const createDistributor = async (req: Request, res: Response) => {
  try {
    const { nombre, telefono, empresa } = req.body;

    const empresa_valid = await Prismaclient.empresa.findFirst({
      where: { descripcion: empresa },
    });

    if (!empresa_valid) {
      res.status(400).json({
        message: `La empresa '${empresa}' no está registrada.`,
      });
    }

    const data = await Prismaclient.distribuidor.create({
      data: {
        nombrecompleto: nombre,
        telefono,
        empresa_fk: Number(empresa_valid?.empresa_pk),
      },
    });

    res.status(201).json(data);
  } catch (error) {
    console.error("Error al registrar distribuidor:", error);
    res.status(500).json({ message: "Error interno del servidor" });
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
          fechaPedido: true,
          pedidos_pk: true,
        },
      },
    },
  });

  const headers = [
    { key: "nombre", header: "Nombre" },
    { key: "empresa", header: "Empresa" },
    { key: "telefono", header: "Nro telefonico" },
    { key: "ultimoPedido", header: "Ultimo pedido" },
  ];


  const dataParse = data.map((res) => ({
    nombre: res.nombrecompleto,
    empresa: res.empresa.descripcion,
    telefono: res.telefono,
    label: res.nombrecompleto,
    value: res.nombrecompleto,
    ultimoPedido: res.pedidos
      .map((res) => res.fechaPedido)
      .slice(-1)[0]
      ?.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }),
    id: res.distribuidor_pk,
  }));

  res.send({data: dataParse, headers});
};

export const getListDistributors = async (_req: Request, res: Response) => {
  const data = await Prismaclient.distribuidor.findMany({
    select: {
      distribuidor_pk: true,
      nombrecompleto: true,
    },
  });

  const dataParse = data.map((res) => ({
    id: res.distribuidor_pk,
    label: res.nombrecompleto,
  }));
  res.send(dataParse);
};

export const getCompanies = async (_req: Request, res: Response) => {
  const data = await Prismaclient.empresa.findMany({
    select: {
      empresa_pk: true,
      descripcion: true,
    },
  });

  const dataParse = data.map((res) => ({
    id: res.empresa_pk,
    label: res.descripcion,
  }));

  res.send(dataParse);
};

export const getdistributorsGraphic = async (_req: Request, res: Response) => {
  const data = await Prismaclient.detallespedidos.findMany({
    select: {
      cantidad: true,
      pedidos: {
        select: {
          distribuidor: {
            
            select: {
              empresa: 
              {
                select: {
                  empresa_pk: true,
                  descripcion: true,
                },
              },
            },
          },
        },
      },
    },
  });
  
  const grouped: Record<number, { distribuidor: string; distribuidor_pk: number; cantidad: number }> = {};
  
  for (const item of data) {
    const distribuidor = item.pedidos.distribuidor;
    const id = distribuidor.empresa.empresa_pk;
  
    if (!grouped[id]) {
      grouped[id] = {
        distribuidor: distribuidor.empresa.descripcion,
        distribuidor_pk: id,
        cantidad: 0,
      };
    }
  
    grouped[id].cantidad += item.cantidad;
  }
  
  const result = Object.values(grouped);

  res.send(result);
};
