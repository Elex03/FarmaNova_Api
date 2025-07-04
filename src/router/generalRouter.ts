import { Router } from "express";
import { createBackup, createCompany, getBackups, restoreBackup } from "../controllers/general";
import { getItemPerCode, getMakeSales } from "../controllers/makeSales/GET/getMakeSales.controller";
import { createMakeSales } from "../controllers/makeSales/POST/createMakeSales.controller";


const generalRouter = Router();

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Crea una nueva empresa
 *     tags:
 *       - Empresas
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
 *                 example: FarmaNova S.A.
 *     responses:
 *       200:
 *         description: Empresa creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Companies was created
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 */

generalRouter.post('/createCompany', createCompany);

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Obtiene medicamentos disponibles para la venta
 *     tags:
 *       - Ventas
 *     responses:
 *       200:
 *         description: Lista de medicamentos disponibles obtenida correctamente
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
 *                       id:
 *                         type: number
 *                         example: 1
 *                       descripcion:
 *                         type: string
 *                         example: Paracetamol 500mg
 *                       imagenUrl:
 *                         type: string
 *                         example: ./uploads/paracetamol.jpg
 *                       accionTera:
 *                         type: string
 *                         example: Analgésico
 *                       fabricante:
 *                         type: string
 *                         example: FarmaNova S.A.
 *                       stock:
 *                         type: number
 *                         example: 50
 *                       precioVenta:
 *                         type: number
 *                         example: 2.5
 *                 headers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       key:
 *                         type: string
 *                         example: descripcion
 *                       header:
 *                         type: string
 *                         example: Descripcion
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 */

generalRouter.get('/getMakeSales', getMakeSales);

/**
 * @swagger
 * /items/{code}:
 *   get:
 *     summary: Obtiene un medicamento por su código de barra
 *     tags:
 *       - Medicamentos
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Código de barra del medicamento
 *         example: 1234567890
 *     responses:
 *       200:
 *         description: Resultado de la búsqueda del medicamento
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     data:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: Paracetamol 500mg
 *                         stock:
 *                           type: number
 *                           example: 50
 *                         price:
 *                           type: number
 *                           example: 2.5
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: Producto no encontrado
 *                     data:
 *                       type: "null"
 *                       nullable: true
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 */

generalRouter.get('/getItemPerCode/:code', getItemPerCode);

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Crea una nueva venta con detalles y actualiza el stock de los medicamentos
 *     tags:
 *       - Ventas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pagaCon
 *               - detalle
 *               - empleado_fk
 *               - total
 *             properties:
 *               pagaCon:
 *                 type: number
 *                 example: 100
 *                 description: Monto con el que paga el cliente
 *               empleado_fk:
 *                 type: number
 *                 example: 1
 *                 description: ID del empleado que realiza la venta
 *               total:
 *                 type: number
 *                 example: 75.5
 *                 description: Total de la venta
 *               detalle:
 *                 type: array
 *                 description: Lista de medicamentos vendidos con cantidad
 *                 items:
 *                   type: object
 *                   required:
 *                     - medicamento_fk
 *                     - cantidad
 *                   properties:
 *                     medicamento_fk:
 *                       type: number
 *                       example: 10
 *                       description: ID del medicamento vendido
 *                     cantidad:
 *                       type: number
 *                       example: 3
 *                       description: Cantidad vendida
 *     responses:
 *       201:
 *         description: Venta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Venta creada exitosamente
 *                 ventaId:
 *                   type: number
 *                   example: 123
 *                 total:
 *                   type: number
 *                   example: 75.5
 *                 detalle:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       imageUrl:
 *                         type: string
 *                         example: ./uploads/medicamento1.jpg
 *                       medicamento_fk:
 *                         type: number
 *                         example: 10
 *                       nombre:
 *                         type: string
 *                         example: Paracetamol 500mg
 *                       cantidadVendida:
 *                         type: number
 *                         example: 3
 *                       stockRestante:
 *                         type: number
 *                         example: 47
 *       500:
 *         description: Error al crear la venta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al crear la venta
 */

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