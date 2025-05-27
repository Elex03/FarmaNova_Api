import { Request, Response } from "express";
import { Prismaclient } from "../constants/db";

interface headers {
  header: string;
  key: string;
  isNumeric?: boolean;
  isDate?: boolean;
  isHighlight?: boolean;
}
export const getSalesPerWeek = async (_req: Request, res: Response) => {
  const ventas = await Prismaclient.ventas.findMany({
    select: {
      fechaventa: true,
    },
  });

  const hoy = new Date();
  const inicioSemanaActual = new Date(hoy);
  inicioSemanaActual.setDate(hoy.getDate() - hoy.getDay());
  inicioSemanaActual.setHours(0, 0, 0, 0);

  const inicioSemanaAnterior = new Date(inicioSemanaActual);
  inicioSemanaAnterior.setDate(inicioSemanaActual.getDate() - 7);

  const ventasPorDia: {
    [key: number]: { esta_semana: number; anterior: number };
  } = {
    1: { esta_semana: 0, anterior: 0 },
    2: { esta_semana: 0, anterior: 0 },
    3: { esta_semana: 0, anterior: 0 },
    4: { esta_semana: 0, anterior: 0 },
    5: { esta_semana: 0, anterior: 0 },
    6: { esta_semana: 0, anterior: 0 },
    0: { esta_semana: 0, anterior: 0 },
  };

  ventas.forEach((venta) => {
    const fechaVenta = new Date(venta.fechaventa);
    const diaSemana = fechaVenta.getDay();

    if (fechaVenta >= inicioSemanaActual) {
      ventasPorDia[diaSemana].esta_semana++;
    } else if (fechaVenta >= inicioSemanaAnterior) {
      ventasPorDia[diaSemana].anterior++;
    }
  });

  const resultado = [
    { dia: "Lunes", ...ventasPorDia[1] },
    { dia: "Martes", ...ventasPorDia[2] },
    { dia: "Miércoles", ...ventasPorDia[3] },
    { dia: "Jueves", ...ventasPorDia[4] },
    { dia: "Viernes", ...ventasPorDia[5] },
    { dia: "Sábado", ...ventasPorDia[6] },
    { dia: "Domingo", ...ventasPorDia[0] },
  ];

  res.send(resultado);
};

export const getcompressedForm = async (_req: Request, res: Response) => {
  const data = await Prismaclient.formaFarmaceutica.findMany({});

  const dataParse = data.map((res) => ({
    id: res.formaFarmaceutica_pk,
    label: res.nombre,
    value: res.nombre,
  }));
  res.send(dataParse);
};

export const getTherapeutiAaction = async (_req: Request, res: Response) => {
  const data = await Prismaclient.accionTera.findMany({});

  const dataParse = data.map((res) => ({
    id: res.accionTerapeutica_pk,
    label: res.descripcion,
    value: res.descripcion,
  }));
  res.send(dataParse);
};

export const getCategory = async (_req: Request, res: Response) => {
  const data = await Prismaclient.accionTera.findMany({
    select: {
      accionTerapeutica_pk: true,
      descripcion: true,
    },
    distinct: ["accionTerapeutica_pk"],
  });

  const groupedData = data.reduce((acc: any[], item: any) => {
    const existingCategory = acc.find(
      (cat) => cat.accionTerapeutica_pk === item.accionTerapeutica_pk
    );
    if (existingCategory) {
      existingCategory.cantidad += 1;
    } else {
      acc.push({
        id: item.accionTerapeutica_pk,
        label: item.descripcion,
        value: item.accionTerapeutica_pk,
      });
    }
    return acc;
  }, []);

  res.send(groupedData);
};

export const getInventoryData = async (_req: Request, res: Response) => {
  const data = await Prismaclient.medicamento.findMany({
    select: {
      medicamento_pk: true,
      precioCompra: true,
      imagen: true,
      precioVenta: true,
      empresa: {
        select: {
          descripcion: true,
        }
      },
      EstadoMedicamento: true,
      EstadoMedicamentoExpirado: true,
      descripcion: true,
      stock: true,
      formaFarmaceutica: {
        select: {
          nombre: true,
        },
      },

      detallespedidos: {
        select: {
          fecha_expiracion: true,
          pedidos: {
            select: {
              distribuidor: {
                select: {
                  nombrecompleto: true,
                  empresa: {
                    select: {
                      descripcion: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const headers: headers[] = [
    { key: "descripcion", header: "Descripcion", isHighlight: true },
    { key: "empresa", header: "Empresa" },
    { key: "stock", header: "Stock", isNumeric: true },
    { key: "estadoStock", header: "Estado del stock", isHighlight: true },
    { key: "fechaVencimiento", header: "Fecha Vencimiento", isDate: true },
    {
      key: "EstadoMedicamentoExpirado",
      header: "Estado Medicamento Expirado",
      isHighlight: true,
    },
    { key: "precioCompra", header: "Precio Compra", isNumeric: true },
    { key: "precioVenta", header: "Precio Venta", isNumeric: true },
    { key: "utilidadBruta", header: "Utilidad Bruta", isNumeric: true },
  ];

  const dataParse = data.map((res) => ({
    id: res.medicamento_pk,
    descripcion: res.descripcion + " " + res.formaFarmaceutica.nombre,
    stock: res.stock,
    estadoStock: res.EstadoMedicamento,
    fechaVencimiento: res.detallespedidos.map((dataDist) =>
      dataDist.fecha_expiracion.toISOString().split("T")[0].replace(/-/g, "/")
    )[0],
    empresa: res.empresa.descripcion,
    precioCompra: res.precioCompra,
    precioVenta: res.precioVenta,
    EstadoMedicamentoExpirado: res.EstadoMedicamentoExpirado,
    utilidadBruta: Number(res.precioVenta) - Number(res.precioCompra),
    imagenUrl: res.imagen ? `${res.imagen}` : "./uploads/NF.jpg",
  }));

  res.send({
    data: dataParse,
    headers,
  });
};


export const getMedicalsCloseToExpire = async (_req: Request, res: Response) => {
  const data = await Prismaclient.medicamento.findMany({
    select: {
      medicamento_pk: true,
      descripcion: true,
      stock: true,
      precioCompra: true,
      precioVenta: true,
      imagen: true,
      detallespedidos: {
        select: {
          fecha_expiracion: true,
        },
      },
    },
  });

  const today = new Date();
  const closeToExpire = data.filter((med) => {
    const expirationDate = med.detallespedidos[0]?.fecha_expiracion;
    return expirationDate && (expirationDate.getTime() - today.getTime()) < 30 * 24 * 60 * 60 * 1000; 
  });

  res.send(closeToExpire);
}