import { Prismaclient } from "../constants/db";
import { Request, Response } from "express";

export const createDistributor = async (req: Request, res: Response) => {
  try {
    const { nombre, telefono, empresa } = req.body;


    const data = await Prismaclient.distribuidor.create({
      data: {
        nombrecompleto: nombre,
        telefono,
        empresa_fk: Number(empresa),
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
      detallespedidos: {
        select: {
          pedidos: {
            select:{

              fechaPedido: true,
              pedidos_pk: true,
            }
          }
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
    ultimoPedido: res.detallespedidos
      .map((res) => res.pedidos.fechaPedido)
      .slice(-1)[0]
      ?.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }) ?? "No hay pedidos",
    id: res.distribuidor_pk,
  }));
  res.send({data: dataParse, headers});
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
      cantidadDeEmpaque: true,
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
  });
  
  const grouped: Record<number, { descripcion: string; distribuidor_pk: number; cantidad: number }> = {};
  
  for (const item of data) {
    const distribuidor = item.distribuidor;
    const id = distribuidor.empresa.empresa_pk;
  
    if (!grouped[id]) {
      grouped[id] = {
        descripcion: distribuidor.empresa.descripcion,
        distribuidor_pk: id,
        cantidad: 0,
      };
    }
  
    grouped[id].cantidad += item.cantidadDeEmpaque;
  }
  const result = Object.values(grouped).map((item) => ({
    id: item.distribuidor_pk,
    descripcion: item.descripcion,
    cantidad: item.cantidad,
  }));

  res.send( result);
};
