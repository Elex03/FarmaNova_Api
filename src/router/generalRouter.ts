import { Router } from "express";
import { createBackup, createCompany, getBackups, restoreBackup } from "../controllers/general";
import { getItemPerCode, getMakeSales } from "../controllers/makeSales/GET/getMakeSales.controller";
import { createMakeSales } from "../controllers/makeSales/POST/createMakeSales.controller";


const generalRouter = Router();

generalRouter.post('/createCompany', createCompany);
generalRouter.get('/getMakeSales', getMakeSales);
generalRouter.get('/getItemPerCode/:code', getItemPerCode);
generalRouter.post('/createMakeSales', createMakeSales);


/**
 * @swagger
 * /api/backups:
 *   get:
 *     summary: Obtener lista de backups en formato .sql
 *     tags:
 *       - Backups
 *     responses:
 *       200:
 *         description: Lista de archivos de respaldo disponibles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombre:
 *                         type: string
 *                         example: backup_admin_2025-07-04.sql
 *                       fechaCreacion:
 *                         type: string
 *                         example: 04/07/2025
 *                       horaCreacion:
 *                         type: string
 *                         example: 22:10:45
 *                       usuario:
 *                         type: string
 *                         example: admin
 *                 headers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       key:
 *                         type: string
 *                         example: nombre
 *                       header:
 *                         type: string
 *                         example: Nombre
 *       404:
 *         description: No se encontró la carpeta de backups.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se encontró la carpeta de backups.
 *       500:
 *         description: Error del servidor al obtener los backups.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener los backups.
 */

generalRouter.get('/getBackups', getBackups);

/**
 * @swagger
 * /api/backups:
 *   post:
 *     summary: Crear un nuevo archivo de respaldo (.sql)
 *     tags:
 *       - Backups
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre base del archivo de backup (sin extensión).
 *                 example: backup_manual
 *               usuario:
 *                 type: string
 *                 description: Nombre del usuario que realiza el backup.
 *                 example: admin
 *     responses:
 *       200:
 *         description: Backup creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Backup creado exitosamente
 *                 backup:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                       example: backup_manual-2025-07-04T22-13-45-000Z.sql
 *                     fechaCreacion:
 *                       type: string
 *                       example: 04/07/2025
 *                     horaCreacion:
 *                       type: string
 *                       example: 22:13:45
 *                     usuario:
 *                       type: string
 *                       example: admin
 *       500:
 *         description: Error al crear el archivo de respaldo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al crear backup
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */

generalRouter.post('/createBackup', createBackup);


/**
 * @swagger
 * /api/backups/restore:
 *   post:
 *     summary: Restaurar un archivo de respaldo (.sql)
 *     tags:
 *       - Backups
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del archivo de backup a restaurar (incluyendo la extensión .sql).
 *                 example: backup_manual-2025-07-04T22-13-45-000Z.sql
 *     responses:
 *       200:
 *         description: Backup restaurado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Backup restaurado exitosamente
 *       400:
 *         description: Faltan datos necesarios en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Nombre del backup requerido
 *       404:
 *         description: El archivo de respaldo no existe en el sistema.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: El archivo de backup no existe
 *       500:
 *         description: Error al restaurar el backup o ejecutar el comando `psql`.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al restaurar el backup
 *                 code:
 *                   type: number
 *                   example: 1
 */

generalRouter.post('/restoreBackup', restoreBackup);

export default generalRouter;