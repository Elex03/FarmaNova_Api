import { Router } from "express";
import { createDistributor, getCompanies, getdistributors, getdistributorsGraphic } from "../controllers/distributors";


const distributorsRouter = Router();

/**
 * @swagger
 * /distributors:
 *   post:
 *     summary: Crea un nuevo distribuidor
 *     tags:
 *       - Distribuidores
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - telefono
 *               - empresa
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan Pérez
 *               telefono:
 *                 type: string
 *                 example: 88889999
 *               empresa:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Distribuidor creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 nombrecompleto:
 *                   type: string
 *                   example: Juan Pérez
 *                 telefono:
 *                   type: string
 *                   example: 88889999
 *                 empresa_fk:
 *                   type: number
 *                   example: 1
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

distributorsRouter.post('/', createDistributor);

/**
 * @swagger
 * /distributors:
 *   get:
 *     summary: Obtiene todos los distribuidores con su último pedido
 *     tags:
 *       - Distribuidores
 *     responses:
 *       200:
 *         description: Lista de distribuidores obtenida correctamente
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
 *                         example: Juan Pérez
 *                       empresa:
 *                         type: string
 *                         example: FarmaNova S.A.
 *                       telefono:
 *                         type: string
 *                         example: 88889999
 *                       label:
 *                         type: string
 *                         example: Juan Pérez
 *                       value:
 *                         type: string
 *                         example: Juan Pérez
 *                       ultimoPedido:
 *                         type: string
 *                         example: "04 de julio de 2025"
 *                       id:
 *                         type: number
 *                         example: 1
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

distributorsRouter.get('/', getdistributors);

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Obtiene todas las empresas disponibles
 *     tags:
 *       - Empresas
 *     responses:
 *       200:
 *         description: Lista de empresas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   label:
 *                     type: string
 *                     example: FarmaNova S.A.
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

distributorsRouter.get('/getCompanies', getCompanies)

/**
 * @swagger
 * /distributors/graphic:
 *   get:
 *     summary: Obtiene los datos agregados de distribuidores por empresa para gráficos
 *     tags:
 *       - Distribuidores
 *     responses:
 *       200:
 *         description: Datos agregados por empresa obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: ID de la empresa
 *                     example: 1
 *                   descripcion:
 *                     type: string
 *                     description: Nombre de la empresa
 *                     example: FarmaNova S.A.
 *                   cantidad:
 *                     type: number
 *                     description: Total de empaques entregados por distribuidores de esa empresa
 *                     example: 150
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

distributorsRouter.get('/getdistributors', getdistributorsGraphic)


export default distributorsRouter; 