import { Prismaclient } from "../constants/db";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const createCompany = async (req: Request, res: Response) => {
  const { nombre } = req.body;

  await Prismaclient.empresa.create({
    data: {
      descripcion: nombre,
    },
  });

  res.send("Companies was created");

  // Función para formatear fecha y hora
};

const formatDateTime = (date: Date) => {
  const opcionesFecha: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const opcionesHora: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const fecha = date.toLocaleDateString("es-ES", opcionesFecha); // ej. 27/05/2025
  const hora = date.toLocaleTimeString("es-ES", opcionesHora); // ej. 01:20 p. m.

  return { fecha, hora };
};
export const getBackups = async (_req: Request, res: Response) => {
  try {
    const backupDir = path.join(__dirname, "..", "..", "backups");

    if (!fs.existsSync(backupDir)) {
      res
        .status(404)
        .json({ message: "No se encontró la carpeta de backups." });
    }

    const files = await fs.promises.readdir(backupDir);
    const sqlFiles = files.filter((file) => file.endsWith(".sql"));

    const backupsWithInfo = await Promise.all(
      sqlFiles.map(async (file) => {
        const filePath = path.join(backupDir, file);
        const stats = await fs.promises.stat(filePath);

        const { fecha, hora } = formatDateTime(stats.birthtime);
        const userMatch = file.match(/backup_(.*?)_/);
        const usuario = userMatch ? userMatch[1] : "Desconocido";

        return {
          nombre: file,
          fechaCreacion: fecha,
          horaCreacion: hora,
          usuario: usuario,
        };
      })
    );

    const headers = [
      {
        key: "nombre",
        header: "Nombre",
      },
      { key: "fechaCreacion", header: "Fecha de creación" },
      { key: "horaCreacion", header: "Hora a la que se realizo" },
      { key: "usuario", header: "Realizada por" },
    ];

    res.status(200).json({data: backupsWithInfo, headers: headers});
  } catch (error) {
    console.error("Error al leer los backups:", error);
    res.status(500).json({ message: "Error al obtener los backups." });
  }
};
