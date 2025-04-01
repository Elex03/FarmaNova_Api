import { Prismaclient } from "../constants/db";
import { Request, Response } from "express";

export const createCompany = async (req: Request, res: Response) => {
  const { nombre } = req.body;

  await Prismaclient.empresa.create({
    data: {
      descripcion: nombre,
    },
  });

  res.send("Companies was created");
};
