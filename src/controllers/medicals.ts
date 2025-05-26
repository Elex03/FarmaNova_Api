import { Request, Response } from "express";
import { Prismaclient } from "../constants/db";



export const createMedicine = async (req: Request, res: Response) => {
  const { nombre, via, presentacion, precioCompra, precioVenta, minStock, maxStock, requierePrescripcion, codigo} = req.body;

  // Parseo de arrays enviados como JSON strings
  let accioTera: number[] = [];
  // let sintomas: number[] = [];

  try {
    if (typeof req.body.accioTera === "string") {
      accioTera = JSON.parse(req.body.accioTera);
    } else if (Array.isArray(req.body.accioTera)) {
      accioTera = req.body.accioTera.map(Number);
    }

    // if (typeof req.body.sintomas === "string") {
    //   sintomas = JSON.parse(req.body.sintomas);
    // } else if (Array.isArray(req.body.sintomas)) {
    //   sintomas = req.body.sintomas.map(Number);
    // }


  } catch (err) {
    res.status(400).json({ error: "Error al parsear arrays" });
  }

  try {
    const result = await Prismaclient.$transaction(async (tx) => {
      const medicine = await tx.medicamento.create({
        data: {
          descripcion: nombre,
          imagen: req.file ? `uploads/${req.file.filename}` : null,
          via,
          precioCompra: Number(precioCompra),
          precioVenta: Number(precioVenta),
          cantidadMinima: Number(minStock),
          cantidadMaxima: Number(maxStock),
          fechaCreacion: new Date(),
          fechaModificacion: new Date(),
          EstadoMedicamento: "DISPONIBLE",
          EstadoMedicamentoExpirado: "DISPONIBLE",
          codigoBarra: codigo,
          formaFarmaceutica: {
            connect: {
              formaFarmaceutica_pk: Number(presentacion),
          }},
          requierePrescripcion: requierePrescripcion === "true" ? true : false,
        },
      });

      if (accioTera.length > 0) {
        await tx.accionmedicamentos.createMany({
          data: accioTera.map((accionId) => ({
            medicamento_fk: medicine.medicamento_pk,
            accionTerapeutica_fk: Number(accionId),
          })),
        });
      }

      // if (sintomas.length > 0) {
      //   await tx.medicamentoSintoma.createMany({
      //     data: sintomas.map((sintomaId) => ({
      //       medicamento_fk: medicine.medicamento_pk,
      //       sintoma_fk: Number(sintomaId),
      //     })),
      //   });
      // }

      return medicine;
    });

    res.status(200).json(result);
  } catch (err) {
    console.error("Error al crear medicina:", err);
    res.status(500).json({ error: "Error al crear medicina" });
  }
};
