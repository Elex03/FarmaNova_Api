import { Request, Response } from "express";
import { Prismaclient } from "../constants/db"; 

export const getCatalogMedicines = async (_req: Request, res: Response) => {
  try {
    const data = await Prismaclient.medicamento.findMany({
      select: {
        medicamento_pk: true,
        descripcion: true,
        requierePrescripcion: true,
        stock: true,
        precioVenta: true,
        formaFarmaceutica: {
          select: {
            nombre: true,
          },
        },
        detallespedidos: {
          select: {
            pedidos: {
              select: {
                distribuidor: {
                  select: {
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

    const dataParse = data.map((res) => ({
      descripcion:
        res.descripcion +
        " " +
        res.formaFarmaceutica.nombre,
      maxCantidad: res.stock,
      cantidad: 0,
      precio: Number(res.precioVenta),
      id: res.medicamento_pk,
      empresa:
        res.detallespedidos[0]?.pedidos.distribuidor.empresa.descripcion ||
        "No disponible",
      requierePrescripcion: res.requierePrescripcion,
    }));

    res.json(dataParse);
  } catch (error) {
    console.error("Error al obtener medicamentos:");
    res.status(500).json({ error: "Error al obtener los medicamentos" });
  }
};
