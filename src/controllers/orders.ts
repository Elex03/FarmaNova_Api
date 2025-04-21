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
    id: req.params.id,
    cliente: "Ana López",
    fecha: "2025-04-21",
    total: 150.0,
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
          cantidad: true,
          variante: {
            select: {
              precioVenta: true,
              _count: true,
            },
          },
        },
      },
    },
  });

  const headers = [
    { key: "cliente", header: "Nombre del cliente" },
    { key: "cantidad", header: "Cantidad de medicamentos vendidos" },
    { key: "fechaventa", header: "Fecha de la venta" },
    { key: "horaventa", header: "Hora de la venta" },
    { key: "total", header: "Total de la venta" },
  ];
  const ventasConTotal = data.map((venta) => {
    const total = venta.detallesventa.reduce((acc, detalle) => {
      const precioMedicamentos = detalle.variante.precioVenta || 0;
      return acc + precioMedicamentos.toNumber();
    }, 0);

    return {
      id: venta.ventas_pk,
      cliente: venta.cliente.nombre,
      cantidad: venta.detallesventa.reduce((acc, detalle) => {
        return acc + detalle.cantidad;
      }, 0),
      fechaventa: venta.fechaventa.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }),
      horaventa: venta.fechaventa.toLocaleTimeString("es-ES"),
      total,
    };
  });

  res.send({ data: ventasConTotal, headers });
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

  const headers = [
    { key: "nombre", header: "Nombre" },
    { key: "empresa", header: "Empresa" },
    { key: "estado", header: "Estado del pedido" },
    { key: "total", header: "Total del pedido" },
    { key: "fechaPedido", header: "Fecha de la orden" },
    { key: "fechaEntrega", header: "Fecha de entrega de la orden" },
    { key: "hora", header: "Hora de entrega"}
  ];

  const response = data.map((pedido) => {
    // Sumamos los precios de venta de los detalles del pedido
    let totalPedido = 0;
    pedido.detallespedidos.forEach((detalle) => {
      totalPedido += detalle.precioventa * detalle.cantidad; // Asegúrate de que 'precioventa' sea un número
    });

    return {
      id: pedido.distribuidor.distribuidor_pk,
      nombre: pedido.distribuidor.nombrecompleto,
      empresa: pedido.distribuidor.empresa.descripcion,
      fechaPedido: new Date(pedido.fechaPedido).toLocaleDateString("es-ES"),
      hora: pedido.fechaEntrega ? new Date(pedido.fechaEntrega).toLocaleTimeString("es-ES") : null,
      estado: pedido.estado,
      total: totalPedido.toFixed(2),
      fechaEntrega: pedido.fechaEntrega
        ? new Date(pedido.fechaEntrega).toLocaleDateString("es-ES")
        : null, // Si 'fechaEntrega' está disponible
    };
  });

  res.send({ data: response, headers });
};

export const getOrdersGraph = async (req: Request, res: Response) => {
  const data = await Prismaclient.pedidos.findMany({
    select: {
      fechaPedido: true,
    },
    where: {
      distribuidor_fk: Number(req.params.id),
    },
  });

  const pedidosPorMes: Record<number, number> = {};
  for (let i = 0; i < 12; i++) {
    pedidosPorMes[i] = 0;
  }

  // Contamos los pedidos por mes
  data.forEach((pedido) => {
    const mes = new Date(pedido.fechaPedido).getMonth(); // 0 = enero
    pedidosPorMes[mes] += 1;
  });

  const response = Object.entries(pedidosPorMes)
    .map(([mes, totalPedidos]) => ({
      mes: Number(mes),
      totalPedidos,
    }))
    .sort((a, b) => a.mes - b.mes);

  const parseData = response.map((res) => res.totalPedidos);
  res.send(parseData);
};
