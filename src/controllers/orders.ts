import { Request, Response } from "express";
import { Prismaclient } from "../constants/db";

export const getDetailsSales = async (req: Request, res: Response) => {
  const data = await Prismaclient.detallesventa.findMany({
    select: {
      cantidad: true,

      medicamento: {
        select: {
          descripcion: true,
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
      nombre: res.medicamento.descripcion,
      precio: Number(res.medicamento.precioVenta),
      cantidad: res.cantidad,
      total: Number(res.medicamento.precioVenta) * res.cantidad,
    })),
  };
  res.send(parseData);
};

export const getSales = async (_req: Request, res: Response) => {
  const data = await Prismaclient.ventas.findMany({
    select: {
      total: true,
      ventas_pk: true,
      fechaventa: true,
      detallesventa: {
        select: {
          cantidad: true,
          medicamento: {
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
    { key: "cantidad", header: "Cantidad de medicamentos vendidos" },
    { key: "fechaventa", header: "Fecha de la venta" },
    { key: "horaventa", header: "Hora de la venta" },
    { key: "total", header: "Total de la venta" },
  ];
  const ventasConTotal = data.map((venta) => {
    return {
      id: venta.ventas_pk,
      cantidad: venta.detallesventa.reduce((acc, detalle) => {
        return acc + detalle.cantidad;
      }, 0),
      fechaventa: venta.fechaventa.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }),
      horaventa: venta.fechaventa.toLocaleTimeString("es-ES"),
      total: venta.total.toFixed(2),
    };
  });

  res.send({ data: ventasConTotal, headers });
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

          medicamento: {
            select: {
              descripcion: true,
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

interface headers {
  header: string;
  key: string;
  isNumeric?: boolean;
  isDate?: boolean;
  isHighlight?: boolean;
}

export const getOneOrderHistory = async (req: Request, res: Response) => {
  const data = await Prismaclient.detallespedidos.findMany({
    select: {
      pedidos: {
        select: {
          estado: true,
          fechaPedido: true,
          fechaEntrega: true,
        },
      },

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
      medicamentos: {
        select: {
          precioVenta: true,
        },
      },
      cantidadDeEmpaque: true,
    },
    where: {
      distribuidor_fk: Number(req.params.id),
    },
  });

  const headers: headers[] = [
    { key: "nombre", header: "Nombre", isHighlight: true },
    { key: "empresa", header: "Empresa", isHighlight: true },
    { key: "estado", header: "Estado del pedido", isHighlight: true },
    { key: "total", header: "Total del pedido", isNumeric: true },
    { key: "fechaPedido", header: "Fecha de la orden", isDate: true },
    {
      key: "fechaEntrega",
      header: "Fecha de entrega de la orden",
      isDate: true,
    },
    { key: "hora", header: "Hora de entrega" },
  ];

  const response = data.map((pedido) => {
    // Sumamos los precios de venta de los detalles del pedido
    let totalPedido = 0;
    Number(pedido.medicamentos.precioVenta) * pedido.cantidadDeEmpaque;

    return {
      id: pedido.distribuidor.distribuidor_pk,
      nombre: pedido.distribuidor.nombrecompleto,
      empresa: pedido.distribuidor.empresa.descripcion,
      fechaPedido: new Date(pedido.pedidos.fechaPedido).toLocaleDateString(
        "es-ES"
      ),
      hora: pedido.pedidos.fechaEntrega
        ? new Date(pedido.pedidos.fechaEntrega).toLocaleTimeString("es-ES")
        : null,
      estado: pedido.pedidos.estado,
      total: totalPedido.toFixed(2),
      fechaEntrega: pedido.pedidos.fechaEntrega
        ? new Date(pedido.pedidos.fechaEntrega).toLocaleDateString("es-ES")
        : null, // Si 'fechaEntrega' está disponible
    };
  });

  res.send({ data: response, headers });
};

export const getOrdersGraph = async (req: Request, res: Response) => {
  const data = await Prismaclient.detallespedidos.findMany({
    select: {
      pedidos: {
        select: {
          fechaPedido: true,
        },
      },
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
    const mes = new Date(pedido.pedidos.fechaPedido).getMonth(); // 0 = enero
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

export const registerOrder = async (req: Request, res: Response) => {
  try {
    const detalles = req.body;

    if (!Array.isArray(detalles) || detalles.length === 0) {
      res.status(400).json({ message: "No se enviaron detalles del pedido." });
    }

    const resultado = await Prismaclient.$transaction(async (tx) => {
      const pedido = await tx.pedidos.create({
        data: {
          fechaPedido: new Date(),
          estado: "COMPLETADO",
          empleado: {
            connect: { empleado_pk: 1 },
          },
        },
      });

      const detallesConPedido = detalles.map(
        (detalle: {
          distribuidor: any;
          nombreMedicamento: any;
          fecha_expiracion: string | number | Date;
          cantidadDeEmpaque: string;
          cantidadPorEmpaque: string;
          nroLote: any;
          total: string;
        }) => ({
          distribuidor_fk: Number(detalle.distribuidor),
          medicamento_fk: Number(detalle.nombreMedicamento),
          fecha_expiracion: new Date(detalle.fecha_expiracion),
          cantidadDeEmpaque: parseInt(detalle.cantidadDeEmpaque),
          cantidadPorEmpaque: parseInt(detalle.cantidadPorEmpaque),
          NroLote: detalle.nroLote,
          total: parseFloat(detalle.total),
          pedidos_fk: pedido.pedidos_pk,
        })
      );

      await tx.detallespedidos.createMany({
        data: detallesConPedido,
      });

      // Actualizar el stock de cada medicamento
      for (const detalle of detallesConPedido) {
        const unidadesTotales =
          detalle.cantidadDeEmpaque * detalle.cantidadPorEmpaque;

        await tx.medicamento.update({
          where: {
            medicamento_pk: detalle.medicamento_fk,
          },
          data: {
            stock: {
              increment: unidadesTotales,
            },
          },
        });
      }
      return { pedido, detalles: detallesConPedido };
    });

    res.status(201).json({
      message: "Pedido y detalles registrados correctamente",
      pedido: resultado.pedido,
      detalles: resultado.detalles,
    });
  } catch (error) {
    console.error("Error al registrar el pedido:", error);
    res.status(500).json({
      message: "Hubo un error al registrar el pedido",
      error,
    });
  }
};
