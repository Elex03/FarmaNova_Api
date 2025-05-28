import { exec, spawn } from "child_process";
import { Prismaclient } from "../constants/db";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

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

    res.status(200).json({ data: backupsWithInfo, headers: headers });
  } catch (error) {
    console.error("Error al leer los backups:", error);
    res.status(500).json({ message: "Error al obtener los backups." });
  }
};

dotenv.config();

const DB_USER = process.env.DB_USER!;
const CONTAINER_NAME = process.env.DB_CONTAINER!;
const DB_NAME = process.env.DB_NAME!;
const BACKUP_DIR = path.resolve(process.env.BACKUP_DIR || "./backups");

export const createBackup = async (req: Request, res: Response) => {
  const { nombre = `backup-${Date.now()}`, usuario = "desconocido" } = req.body;

  const timestamp = new Date();
  const dateStr = timestamp.toISOString().replace(/[:.]/g, "-"); // Ej: 2025-05-27T15-30-00-000Z
  const fileName = `${nombre}-${dateStr}.sql`;
  const filePath = path.join(BACKUP_DIR, fileName);

  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  const dumpCommand = `docker exec ${CONTAINER_NAME} pg_dump -U ${DB_USER} ${DB_NAME}`;

  const fullCommand = `${dumpCommand} > "${filePath}"`;

  exec(fullCommand, (error) => {
    if (error) {
      console.error("Error al crear backup:", error);
      return res.status(500).json({ message: "Error al crear backup", error });
    }

    const metadata = {
      nombre: fileName,
      fechaCreacion: timestamp.toLocaleDateString(),
      horaCreacion: timestamp.toLocaleTimeString(),
      usuario,
    };

    return res.status(200).json({
      message: "Backup creado exitosamente",
      backup: metadata,
    });
  });
};

export const restoreBackup = async (req: Request, res: Response) => {
  const { nombre } = req.body;

  if (!nombre) {
    res.status(400).json({ message: "Nombre del backup requerido" });
  }

  const filePath = path.join("./backups", nombre);

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ message: "El archivo de backup no existe" });
  }

  // Comando para limpiar la base de datos antes de restaurar
  const dropCommand = `docker exec ${CONTAINER_NAME} psql -U ${DB_USER} -d ${DB_NAME} -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"`;

  exec(dropCommand, (dropError) => {
    if (dropError) {
      console.error("Error al limpiar la base de datos:", dropError);
      res
        .status(500)
        .json({
          message: "Error al limpiar la base de datos",
          error: dropError,
        });
    }

    // Restaurar el backup usando stdin
    const restore = spawn("docker", [
      "exec",
      "-i",
      CONTAINER_NAME,
      "psql",
      "-U",
      DB_USER,
      "-d",
      DB_NAME,
    ]);

    // Leer el archivo y enviarlo al stdin del proceso
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(restore.stdin);

    restore.on("exit", (code) => {
      if (code === 0) {
        res.status(200).json({ message: "Backup restaurado exitosamente" });
      } else {
        res.status(500).json({ message: "Error al restaurar el backup", code });
      }
    });

    restore.on("error", (error) => {
      console.error("Error al ejecutar psql:", error);
      res.status(500).json({ message: "Error al ejecutar psql", error });
    });
  });
};
