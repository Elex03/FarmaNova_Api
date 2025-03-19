import { Prismaclient } from "../constants/db";
import { Request, Response } from "express";


export const createDistributor = async (req: Request, res: Response) => {
    const {nombrecompleto , telefono} = req.body;

    const data = await Prismaclient.distribuidor.create({
        data:{
            nombrecompleto, 
            telefono
        }
    })

    res.send(data)
}

export const getdistributors = async (_req: Request, res: Response) => {
    const data = await Prismaclient.distribuidor.findMany();

    res.send(data);
} 