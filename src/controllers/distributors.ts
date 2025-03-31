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

    // Crear el distribuidor si la empresa existe
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
        },
      },
    },
  });

  const dataParse = data.map((res) => ({
    nombre: res.nombrecompleto,
    empresa: res.empresa.descripcion,
    telefono: res.telefono,
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

  res.send(dataParse);
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
