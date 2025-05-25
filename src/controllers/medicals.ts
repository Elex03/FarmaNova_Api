import { Request, Response } from "express";

export const createMedicine = async (req: Request, res: Response) => {
  const { nombre, accionTeraId, fabricante, dosis, via } = req.body;

2

  console.log(req.file, req.body)
  res.send({ nombre, accionTeraId, fabricante, dosis, via , msg:"Jelo"});


};
