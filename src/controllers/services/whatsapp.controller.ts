import { Request, Response } from "express";
import { Prismaclient } from "../../constants/db";

export const getMedicinePerCoincidence = async (
  req: Request,
  res: Response
) => {
  const { description } = req.body;

  try {
    const data = await Prismaclient.medicamento.findMany({
      where: {
        descripcion: {
          contains: description,
          mode: "insensitive",
        },
      },
      select: {
        descripcion: true
      }
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al buscar medicamentos");
  }
};
