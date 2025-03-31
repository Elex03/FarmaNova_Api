import { Request, Response } from "express";
import { Prismaclient } from "../constants/db";

export const getDetailsSales = async (req: Request, res: Response) => {
  const data = await Prismaclient.detallesventa.findMany({
    select: {
      cantidad: true,

      variante: {
        select: {
          medicamento: {
            select: {
              nombreComercial: true,
            },
          },
          precioVenta: true,
        },
      },
    },
    where: {
      ventas_fk: Number(req.params.id),
    },
  });

  const parseData = {
    saleId: req.params.id,
    productos: data.map((res) => ({
      nombre: res.variante.medicamento.nombreComercial,
      precio: res.variante.precioVenta,
      cantidad: res.cantidad,
      total: Number(res.variante.precioVenta) * res.cantidad,
    })),
  };
  res.send(parseData);
};

export const getSales = async (_req: Request, res: Response) => {
  const data = await Prismaclient.ventas.findMany({
    select: {
      ventas_pk: true,
      cliente: {
        select: {
          nombrecompleto: true,
        },
      },
      fechaventa: true,
      detallesventa: {
        select: {
          variante: {
            select: {
              precioVenta: true,
            },
          },
        },
      },
    },
  });

  const ventasConTotal = data.map((venta) => {
    const total = venta.detallesventa.reduce((acc, detalle) => {
      // Aseguramos que el precioVenta es un número
      const precioMedicamentos = detalle.variante.precioVenta || 0;
      return acc + precioMedicamentos.toNumber();
    }, 0);

    return {
      ventas_pk: venta.ventas_pk,
      cliente: venta.cliente.nombrecompleto,
      fechaventa: venta.fechaventa,
      total,
    };
  });

  res.send(ventasConTotal);
};

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
    fechaPedido: res.fechaPedido.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }),
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

export const getOrdersHistory = async (req: Request, res: Response) => {
  const idSales = req.params.id;
  const data = await Prismaclient.ventas.findMany({
    select: {
      ventas_pk: true,
      fechaventa: true,
      detallesventa: {
        select: {
          cantidad: true,

          variante: {
            select: {
              medicamento: {
                select: {
                  nombreComercial: true,
                }
              },
              precioVenta: true,
            },
          },
        },
        where: {
          ventas_fk: Number(idSales),
        },
      },
    },
  });
  res.send(data);
};
