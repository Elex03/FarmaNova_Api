import { Request, Response } from "express";
import { Prismaclient } from "../constants/db"; // Asegúrate de que esta ruta esté correcta

export const createMedicines = async (_req: Request, res: Response) => {
  try {
    res.status(201).json({
      mensaje: "Productos creados correctamente",
    });
  } catch (error) {
    console.error("Error al crear productos:", error);
    res.status(500).json({
      error: "Error al crear productos",
    });
  }
};

const getMedicines = async (_req: Request, res: Response) => {
  try {
    const data = await Prismaclient.variante.findMany({
      select: {
        medicamento: {
          select: {
            nombre: true,
          }
        },
        variante_pk: true,
        stock: true,
        concentracion: true,
        precioVenta: true,
        presentacion: {
          select: {
            nombre: true,
          },
        },
        detallespedidos: {
          select: {
            distribuidor: {
              select: {
                nombrecompleto: true,
              },
            },
          },
        },
      },
    });

    // Mapear los datos para devolverlos en el formato esperado
    const dataParse = data.map((res) => ({
      descripcion:
        res.medicamento.nombre + " " + res.presentacion.nombre + " " + res.concentracion,
      maxCantidad: res.stock,
      precio: res.precioVenta,
      id: res.variante_pk,
      distribuidor: res.detallespedidos[0]?.distribuidor.nombrecompleto || "No disponible",
    }));

    res.json(dataParse); // Asegúrate de usar .json para enviar la respuesta correctamente
  } catch (error) {
    console.error("Error al obtener medicamentos:");
    res.status(500).json({ error: "Error al obtener los medicamentos" });
  }
};

export default getMedicines;
