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
      precio: Number(res.variante.precioVenta),
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
          nombre: true,
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
      const precioMedicamentos = detalle.variante.precioVenta || 0;
      return acc + precioMedicamentos.toNumber();
    }, 0);

    return {
      id: venta.ventas_pk,
      cliente: venta.cliente.nombre,
      fechaventa: venta.fechaventa.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }),
      total,
    };
  });

  res.send(ventasConTotal);
};

export const getOrders = async (_req: Request, res: Response) => {
  const data = await Prismaclient.pedidos.findMany({
    select: {
      distribuidor: {
        select: {
          nombrecompleto: true,
          empresa: true,
        },
      },
      detallespedidos: {
        select: {
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
    nombreDistribuidor: res.distribuidor.nombrecompleto,
    empresa: res.distribuidor.empresa,
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
                },
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

export const getOneOrderHistory = async (req: Request, res: Response) => {
  const data = await Prismaclient.pedidos.findMany({
    select: {
      estado: true,
      distribuidor: {
        select: {
          distribuidor_pk: true,
          nombrecompleto: true,
          empresa: {
            select: {
              descripcion: true,
            },
          },
        },
      },
      fechaPedido: true,
      fechaEntrega: true,
      detallespedidos: {
        select: {
          precioventa: true, 
          cantidad: true,
        },
      },
    },
    where: {
      distribuidor_fk: Number(req.params.id),
    },
  });

  const response = data.map((pedido) => {
    // Sumamos los precios de venta de los detalles del pedido
    let totalPedido = 0;
    pedido.detallespedidos.forEach((detalle) => {
      totalPedido += (detalle.precioventa * detalle.cantidad); // Asegúrate de que 'precioventa' sea un número
    });
  
    return {
      id: pedido.distribuidor.distribuidor_pk,
      nombre: pedido.distribuidor.nombrecompleto,
      empresa: pedido.distribuidor.empresa.descripcion,
      fechaPedido: new Date(pedido.fechaPedido).toLocaleDateString("es-ES"),
      estado: pedido.estado,
      total: totalPedido.toFixed(2), 
      fechaEntrega: pedido.fechaEntrega ? new Date(pedido.fechaEntrega).toLocaleDateString("es-ES") : null, // Si 'fechaEntrega' está disponible
    };
  });
  
  res.send(response);
};
