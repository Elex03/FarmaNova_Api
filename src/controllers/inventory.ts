import { Request, Response } from "express";
import { Prismaclient } from "../constants/db";

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

export const getcompressedForm = async(_req: Request, res: Response) => {
  const data = await Prismaclient.formaFarmaceutica.findMany({});

  const dataParse = data.map((res) => ({
    id: res.formaFarmaceutica_pk,
    label: res.nombre,
    value: res.nombre,
  }));
  res.send(dataParse);
} 


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
        value: item.descripcion,
      });
    }
    return acc;
  }, []);

  res.send(groupedData);
};

export const getOneMedicine = async (req: Request, res: Response) => {
  const data = await Prismaclient.medicamentos.findFirst({
    where: {
      medicamento_pk: +req.params.id,
    },
  });

  res.json(data);
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
