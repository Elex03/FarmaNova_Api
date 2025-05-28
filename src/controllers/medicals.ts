import { Request, Response } from "express";
import { Prismaclient } from "../constants/db";

export const createMedicine = async (req: Request, res: Response) => {
  const {
    nombre,
    via,
    presentacion,
    precioCompra,
    fabricante,
    precioVenta,
    minStock,
    maxStock,
    requierePrescripcion,
    codigo,
  } = req.body;

  let accioTera: number[] = [];
  let sintomas: string[] = [];

  console.log("Sintomas Map:", sintomas);
  try {
    if (typeof req.body.accioTera === "string") {
      accioTera = JSON.parse(req.body.accioTera);
    } else if (Array.isArray(req.body.accioTera)) {
      accioTera = req.body.accioTera.map(Number);
    }

    if (typeof req.body.sintomas === "string") {
      sintomas = JSON.parse(req.body.sintomas);
    } else if (Array.isArray(req.body.sintomas)) {
      sintomas = req.body.sintomas.map(String);
    }
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
          empresa: {
            connect: {
              empresa_pk: Number(fabricante),
            },
          },
          codigoBarra: codigo,
          formaFarmaceutica: {
            connect: {
              formaFarmaceutica_pk: Number(presentacion),
            },
          },
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

      if (sintomas.length > 0) {
        // 1. Buscar síntomas existentes
        const sintomasDb = await tx.sintomas.findMany({
          where: {
            descripcion: {
              in: sintomas.map((s) =>
                typeof s === "string"
                  ? s.toLowerCase()
                  : String(s).toLowerCase()
              ),
            },
          },
          select: {
            sintoma_pk: true,
            descripcion: true,
          },
        });

        const sintomasExistentes = new Set(
          sintomasDb.map((s) => s.descripcion.toLowerCase())
        );

        // 2. Filtrar síntomas que no existen
        const sintomasFaltantes = sintomas.filter((s) => {
          const descripcion =
            typeof s === "string" ? s.toLowerCase() : String(s).toLowerCase();
          return !sintomasExistentes.has(descripcion);
        });

        // 3. Crear síntomas faltantes
        if (sintomasFaltantes.length > 0) {
          await tx.sintomas.createMany({
            data: sintomasFaltantes.map((descripcion) => ({
              descripcion:
                typeof descripcion === "string"
                  ? descripcion
                  : String(descripcion),
            })),
          });
        }

        // 4. Volver a obtener todos los síntomas actualizados
        const todosLosSintomasDb = await tx.sintomas.findMany({
          where: {
            descripcion: {
              in: sintomas.map((s) =>
                typeof s === "string"
                  ? s.toLowerCase()
                  : String(s).toLowerCase()
              ),
            },
          },
          select: {
            sintoma_pk: true,
            descripcion: true,
          },
        });

        // 5. Mapear descripción -> sintoma_pk
        const sintomasMap = new Map(
          todosLosSintomasDb.map(
            (s: { descripcion: string; sintoma_pk: any }) => [
              s.descripcion.toLowerCase(),
              s.sintoma_pk,
            ]
          )
        );

        const relaciones = sintomas
          .map((descripcion: string | number) => {
            const key =
              typeof descripcion === "string"
                ? descripcion.toLowerCase()
                : String(descripcion).toLowerCase();
            const sintomaId = sintomasMap.get(key);
            if (!sintomaId) return null;
            return {
              medicamento_fk: medicine.medicamento_pk,
              sintomas_fk: Number(sintomaId),
            };
          })
          .filter(
            (rel): rel is { medicamento_fk: number; sintomas_fk: number } =>
              rel !== null
          );
        console.log(sintomas);
        if (relaciones.length > 0) {
          await tx.medicamentoSintoma.createMany({
            data: relaciones,
          });
        }
      }
      return medicine;
    });

    res.status(200).json(result);
  } catch (err) {
    console.error("Error al crear medicina:", err);
    res.status(500).json({ error: "Error al crear medicina" });
  }
};

export const getOneMedicine = async (req: Request, res: Response) => {
  const { id } = req.params;

  const MedicineData = await Prismaclient.medicamento.findUnique({
    where: {
      medicamento_pk: Number(id),
    },
    include: {
      empresa: {
        select: {
          empresa_pk: true,
        },
      },
      formaFarmaceutica: {
        select: {
          formaFarmaceutica_pk: true,
        },
      },
      accionmedicamentos: {
        select: {
          accionTera: {
            select: {
              accionTerapeutica_pk: true,
            },
          },
        },
      },
    },
  });

  const dataParse = {
    id: MedicineData?.medicamento_pk,
    nombre: MedicineData?.descripcion,
    imagen: MedicineData?.imagen,
    via: MedicineData?.via,
    precioCompra: Number(MedicineData?.precioCompra),
    precioVenta: Number(MedicineData?.precioVenta),
    minStock: MedicineData?.cantidadMinima,
    maxStock: MedicineData?.cantidadMaxima,
    requierePrescripcion: MedicineData?.requierePrescripcion,
    codigo: MedicineData?.codigoBarra,
    fabricante: MedicineData?.empresa.empresa_pk,
    presentacion: MedicineData?.formaFarmaceutica.formaFarmaceutica_pk,
    accioTera: MedicineData?.accionmedicamentos.map(
      (item) => item.accionTera.accionTerapeutica_pk
    ),
  };

  if (!MedicineData) {
    res.status(404).json({ error: "Medicina no encontrada" });
  }
  res.send(dataParse);
};

export const getMedicineSelect = async (_req: Request, res: Response) => {
  const data = await Prismaclient.medicamento.findMany({
    select: {
      medicamento_pk: true,
      precioVenta: true,
      descripcion: true,
      formaFarmaceutica: {
        select: {
          nombre: true,
        },
      },
    },
  });

  const dataParse = data.map((res) => ({
    id: res.medicamento_pk,
    label: res.descripcion + " - " + res.formaFarmaceutica.nombre,
    value: res.descripcion + " - " + res.formaFarmaceutica.nombre,
    precio: Number(res.precioVenta),
  }));

  res.send(dataParse);
};

export const getSymptoms = async (_req: Request, res: Response) => {
  const data = await Prismaclient.sintomas.findMany({
    select: {
      sintoma_pk: true,
      descripcion: true,
    },
  });

  const dataParse = data.map((res) => ({
    id: res.sintoma_pk,
    text: res.descripcion,
  }));

  res.send(dataParse);
};
