import { Router } from "express";
import { getCategory, getcompressedForm, getInventoryData, getSalesPerWeek } from "../controllers/inventory";


const inventoryRouter = Router();


/**
 * @swagger
 * /sales/week:
 *   get:
 *     summary: Obtiene el conteo de ventas por día para la semana actual y la anterior
 *     tags:
 *       - Ventas
 *     responses:
 *       200:
 *         description: Conteo de ventas por día de la semana actual y anterior
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   dia:
 *                     type: string
 *                     example: Lunes
 *                   esta_semana:
 *                     type: integer
 *                     example: 5
 *                   anterior:
 *                     type: integer
 *                     example: 3
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

inventoryRouter.get('/getSalesPerWeek',getSalesPerWeek );

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtiene las categorías de acción terapéutica disponibles
 *     tags:
 *       - Categorías
 *     responses:
 *       200:
 *         description: Lista de categorías de acción terapéutica
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
 *                     example: Analgésicos
 *                   value:
 *                     type: number
 *                     example: 1
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

inventoryRouter.get('/getCategories', getCategory);

/**
 * @swagger
 * /forms:
 *   get:
 *     summary: Obtiene las formas farmacéuticas disponibles
 *     tags:
 *       - Formas Farmacéuticas
 *     responses:
 *       200:
 *         description: Lista de formas farmacéuticas en formato compacto
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
 *                     example: Tableta
 *                   value:
 *                     type: string
 *                     example: Tableta
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

inventoryRouter.get('/getCompressedforms', getcompressedForm);

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: Obtiene los datos detallados del inventario de medicamentos
 *     tags:
 *       - Inventario
 *     responses:
 *       200:
 *         description: Datos del inventario obtenidos correctamente
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
 *                         example: Paracetamol Tableta
 *                       stock:
 *                         type: number
 *                         example: 50
 *                       estadoStock:
 *                         type: string
 *                         example: Disponible
 *                       fechaVencimiento:
 *                         type: string
 *                         format: date
 *                         example: 2025/12/31
 *                       empresa:
 *                         type: string
 *                         example: FarmaNova S.A.
 *                       precioCompra:
 *                         type: number
 *                         example: 1.2
 *                       precioVenta:
 *                         type: number
 *                         example: 2.5
 *                       EstadoMedicamentoExpirado:
 *                         type: boolean
 *                         example: false
 *                       utilidadBruta:
 *                         type: number
 *                         example: 1.3
 *                       imagenUrl:
 *                         type: string
 *                         example: ./uploads/NF.jpg
 *                       sintomas:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example:
 *                           - Dolor de cabeza
 *                           - Fiebre
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
 *                       isHighlight:
 *                         type: boolean
 *                         example: true
 *                       isNumeric:
 *                         type: boolean
 *                         example: false
 *                       isDate:
 *                         type: boolean
 *                         example: true
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

inventoryRouter.get('/getInventoryData', getInventoryData);

export default inventoryRouter;