import { Request, Response } from "express";
import { Prismaclient } from "../constants/db";




export const getInventory = async(_req: Request, res: Response) => {
    const data = await Prismaclient.medicamentos.findMany(
        {
            select: {
                nombre: true, 
                cantidaddisponible: true,   
                tama_o: true, 
                  
                presentacion: {
                    select: {
                        descripcion: true
                    }
                }, 
                detallespedidos: {
                    select: {
                        fecha_expiracion: true, 
                        distribuidor: {
                            select: {
                                nombrecompleto: true,
                            }
                        }
                    }
                }
            }
        }
    
    );


    const dataParse = data.map((res) => ({
        descripcion: (res.nombre ?? 'a') + ' ' + (res.presentacion.descripcion ?? 'a')
            + ' ' + res.tama_o ,
        stock: res.cantidaddisponible,
        distribuidor: res.detallespedidos.map((dataDist) => dataDist.distribuidor.nombrecompleto)[0],
        fechaVencimiento: res.detallespedidos.map((dataDist) => dataDist.fecha_expiracion)[0]
    }));


    res.json(dataParse);
} 

export const getOneMedicine = async(req: Request, res: Response) => {
    const data = await Prismaclient.medicamentos.findFirst({
        where: {
            medicamento_pk: +req.params.id
        }
    })

    res.json(data);
}

export const deleteOneMedicine = async(req: Request, res: Response) => {
    const data = await Prismaclient.medicamentos.delete({
        where: {
            medicamento_pk: +req.params.id
        }
    })
    if (!data) 
        res.send('No se ha podido eliminar el medicamento');
    else
        res.send('Medicamento eliminado con exito')
}