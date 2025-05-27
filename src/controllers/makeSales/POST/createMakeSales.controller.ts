import { Request, Response } from "express";
import { Prismaclient } from "../../../constants/db";

export const createMakeSales = async (req: Request, res: Response) => {
  const { pagaCon, detalle, empleado_fk, total } = req.body;

  try {
    const result = await Prismaclient.$transaction(async (tx) => {
      const sale = await tx.ventas.create({
        data: {
          fechaventa: new Date(),
          empleado_fk: Number(empleado_fk),
          estado: "COMPLETADO",
          pagaCon: Number(pagaCon),
          total: Number(total),
        },
      });

      const saleDetails = detalle.map((item: any) => ({
        ventas_fk: sale.ventas_pk,
        medicamento_fk: item.medicamento_fk,
        cantidad: item.cantidad,
      }));

      await tx.detallesventa.createMany({
        data: saleDetails,
      });

      for (const item of detalle) {
        await tx.medicamento.update({
          where: { medicamento_pk: item.medicamento_fk },
          data: {
            stock: {
              decrement: item.cantidad,
            },
          },
        });
      }

      return sale;
    });

    res
      .status(201)
      .json({ message: "Venta creada exitosamente", sale: result });
  } catch (error) {
    console.error("Error creating sale:", error);
    res.status(500).json({ error: "Error al crear la venta" });
  }
};
