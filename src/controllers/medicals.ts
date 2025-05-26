import { Request, Response } from "express";
import { Prismaclient } from "../constants/db";
import { EstadoMedicamento, EstadoMedicamentoExpirado } from "@prisma/client";

export const createMedicine = async (req: Request, res: Response) => {
  const { nombre, via, accionTerapeuticaIds, formaFarmaceutica} =
    req.body;

  const result = await Prismaclient.$transaction(async (tx) => {
    const medicine = await tx.medicamento.create({
      data: {
        descripcion: nombre,
        imagen: 'uploads/'+ req.file?.filename || null,
        via,
        EstadoMedicamento: EstadoMedicamento.DISPONIBLE, 
        EstadoMedicamentoExpirado: EstadoMedicamentoExpirado.DISPONIBLE,
        forma_fk: Number(formaFarmaceutica),
      },
    });

    await tx.accionmedicamentos.createMany({
      data: accionTerapeuticaIds.map((accionId: number) => ({
        medicamento_fk: medicine.medicamento_pk,
        accionTerapeutica_fk: Number(accionId),
      })),
    });

    return medicine;
  });

  res.send(result);
};
