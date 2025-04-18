import { Request, Response } from "express";
import { Prismaclient } from "../constants/db";

interface headers {
  header: string;
  key: string;
  isNumeric?: boolean;
  isDate?: boolean;
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
  }));
  res.send(dataParse);
};

// export const getInventory = async (_req: Request, res: Response) => {
//   const data = await Prismaclient.variante.findMany({
//     select: {
//       medicamento: {
//         select: {
//           nombreComercial: true,
//         },
//       },
//       stock: true,
//       concentracion: true,
//       presentacion: {
//         select: {
//           nombre: true,
//         },
//       },
//       detallespedidos: {
//         select: {
//           fecha_expiracion: true,
//           distribuidor: {
//             select: {
//               nombrecompleto: true,
//             },
//           },
//         },
//       },
//     },
//   });

//   const dataParse = data.map((res) => ({
//     descripcion:
//       (res.medicamento.nombreComercial ?? "a") +
//       " " +
//       (res.presentacion.nombre ?? "a") +
//       " " +
//       res.concentracion,
//     stock: res.stock,
//     distribuidor: res.detallespedidos.map(
//       (dataDist) => dataDist.distribuidor.nombrecompleto
//     )[0],
//     fechaVencimiento: new Date(
//       res.detallespedidos.map((dataDist) => dataDist.fecha_expiracion)[0]
//     ).toLocaleDateString("es-ES", {
//       year: "numeric",
//       month: "long",
//       day: "2-digit",
//     }),
//   }));

//   res.json(dataParse);
// };
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

export const deleteOneMedicine = async (req: Request, res: Response) => {
  const data = await Prismaclient.medicamentos.delete({
    where: {
      medicamento_pk: +req.params.id,
    },
  });
  if (!data) res.send("No se ha podido eliminar el medicamento");
  else res.send("Medicamento eliminado con exito");
};

export const getInventoryData = async (_req: Request, res: Response) => {
  const data = await Prismaclient.variante.findMany({
    select: {
      variante_pk: true,
      imagen: true,
      precioVenta: true,
      EstadoMedicamento: true,
      fehcaexpiracion: true,
      EstadoMedicamentoExpirado: true,
      medicamento: {
        select: {
          nombreComercial: true,
          concentracion: true,
        },
      },
      stock: true,
      formaFarmaceutica: {
        select: {
          nombre: true,
        },
      },

      detallespedidos: {
        select: {
          fecha_expiracion: true,
          precioventa: true,
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
    { key: "descripcion", header: "Descripcion" },
    { key: "empresa", header: "Empresa" },
    { key: "stock", header: "Stock", isNumeric: true },
    { key: "estadoStock", header: "Estado del stock" },
    { key: "fechaVencimiento", header: "Fecha Vencimiento", isDate: true },
    { key: "EstadoMedicamentoExpirado", header: "Estado Medicamento Expirado" },
    { key: "precioCompra", header: "Precio Compra", isNumeric: true },
    { key: "precioVenta", header: "Precio Venta", isNumeric: true },
    { key: "utilidadBruta", header: "Utilidad Bruta", isNumeric: true },
  ];

  const dataParse = data.map((res) => ({
    id: res.variante_pk,
    descripcion:
      res.medicamento.nombreComercial +
      " " +
      res.medicamento.concentracion +
      " " +
      res.formaFarmaceutica.nombre,
    stock: res.stock,
    estadoStock: res.EstadoMedicamento,
    fechaVencimiento: res.detallespedidos.map((dataDist) =>
      dataDist.fecha_expiracion.toISOString().split("T")[0].replace(/-/g, "/")
    )[0],
    empresa: res.detallespedidos.map(
      (dataDist) => dataDist.pedidos.distribuidor.empresa.descripcion
    )[0],
    precioCompra: res.detallespedidos.map(
      (dataDist) => dataDist.precioventa
    )[0],
    precioVenta: res.precioVenta,
    EstadoMedicamentoExpirado: res.EstadoMedicamentoExpirado,
    utilidadBruta: res.detallespedidos.map(
      (dataDist) => Number(res.precioVenta) - Number(dataDist.precioventa)
    )[0],
    imagenUrl: res.imagen
      ? `http://localhost:3000/apiFarmaNova/${res.imagen}`
      : "http://localhost:3000/apiFarmaNova/uploads/NF.jpg",
  }));

  res.send({
    data: dataParse,
    headers,
  });
};
