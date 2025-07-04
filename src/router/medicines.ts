import { Router } from "express";
import { getCatalogMedicines } from "../controllers/medicine";
import { getMedicalsCloseToExpire, getTherapeutiAaction } from "../controllers/inventory";
import { createMedicine, getMedicineSales, getMedicineSelect, getMedicineStock, getOneMedicine, getSymptoms, updateMedicine } from "../controllers/medicals";
import { upload } from "../utils/multer";

const medicineRouter = Router();

/**
 * @swagger
 * /catalog/medicines:
 *   get:
 *     summary: Obtiene el catálogo completo de medicamentos disponibles
 *     tags:
 *       - Catálogo
 *     responses:
 *       200:
 *         description: Catálogo de medicamentos obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   descripcion:
 *                     type: string
 *                     example: Paracetamol Tableta
 *                   maxCantidad:
 *                     type: number
 *                     example: 100
 *                   cantidad:
 *                     type: number
 *                     example: 0
 *                   precio:
 *                     type: number
 *                     example: 2.5
 *                   id:
 *                     type: number
 *                     example: 1
 *                   empresa:
 *                     type: string
 *                     example: FarmaNova S.A.
 *                   requierePrescripcion:
 *                     type: boolean
 *                     example: false
 *       500:
 *         description: Error al obtener los medicamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener los medicamentos
 */

medicineRouter.get("/catalogMedicine", getCatalogMedicines);

/**
 * @swagger
 * /therapeutic-actions:
 *   get:
 *     summary: Obtiene las acciones terapéuticas disponibles
 *     tags:
 *       - Acciones Terapéuticas
 *     responses:
 *       200:
 *         description: Lista de acciones terapéuticas en formato compacto
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
 *                     example: Analgésico
 *                   value:
 *                     type: string
 *                     example: Analgésico
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

medicineRouter.get("/getTherapeuticAction", getTherapeutiAaction);

/**
 * @swagger
 * /medicines/{id}:
 *   get:
 *     summary: Obtiene los detalles de un medicamento por su ID
 *     tags:
 *       - Medicamentos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del medicamento
 *         example: 1
 *     responses:
 *       200:
 *         description: Detalles del medicamento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: Paracetamol 500mg
 *                 imagen:
 *                   type: string
 *                   example: ./uploads/paracetamol.jpg
 *                 via:
 *                   type: string
 *                   example: Oral
 *                 precioCompra:
 *                   type: number
 *                   example: 1.2
 *                 precioVenta:
 *                   type: number
 *                   example: 2.5
 *                 minStock:
 *                   type: integer
 *                   example: 10
 *                 maxStock:
 *                   type: integer
 *                   example: 100
 *                 requierePrescripcion:
 *                   type: boolean
 *                   example: false
 *                 codigo:
 *                   type: string
 *                   example: 1234567890123
 *                 fabricante:
 *                   type: integer
 *                   example: 5
 *                 presentacion:
 *                   type: integer
 *                   example: 2
 *                 sintomas:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - Dolor de cabeza
 *                     - Fiebre
 *                 accioTera:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   example:
 *                     - 1
 *                     - 2
 *       404:
 *         description: Medicina no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Medicina no encontrada
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

medicineRouter.get("/getOneMedicine/:id", getOneMedicine);

/**
 * @swagger
 * /medicines/close-to-expire:
 *   get:
 *     summary: Obtiene medicamentos con fecha de expiración próxima (menos de 30 días)
 *     tags:
 *       - Medicamentos
 *     responses:
 *       200:
 *         description: Lista de medicamentos cercanos a vencer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   medicamento_pk:
 *                     type: integer
 *                     example: 1
 *                   descripcion:
 *                     type: string
 *                     example: Paracetamol 500mg
 *                   stock:
 *                     type: integer
 *                     example: 50
 *                   precioCompra:
 *                     type: number
 *                     example: 1.2
 *                   precioVenta:
 *                     type: number
 *                     example: 2.5
 *                   imagen:
 *                     type: string
 *                     example: ./uploads/paracetamol.jpg
 *                   detallespedidos:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         fecha_expiracion:
 *                           type: string
 *                           format: date-time
 *                           example: 2025-12-31T00:00:00.000Z
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

medicineRouter.get("/getMedicalsCloseToExpire", getMedicalsCloseToExpire);

/**
 * @swagger
 * /medicines/select:
 *   get:
 *     summary: Obtiene la lista de medicamentos en formato para selectores
 *     tags:
 *       - Medicamentos
 *     responses:
 *       200:
 *         description: Lista de medicamentos con id, etiqueta y precio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   label:
 *                     type: string
 *                     example: Paracetamol - Tableta
 *                   value:
 *                     type: string
 *                     example: Paracetamol - Tableta
 *                   precio:
 *                     type: number
 *                     example: 2.5
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

medicineRouter.get("/getMedicineSelect", getMedicineSelect);

/**
 * @swagger
 * /symptoms:
 *   get:
 *     summary: Obtiene la lista de síntomas disponibles
 *     tags:
 *       - Síntomas
 *     responses:
 *       200:
 *         description: Lista de síntomas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   text:
 *                     type: string
 *                     example: Dolor de cabeza
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

medicineRouter.get("/getSymptoms", getSymptoms);

/**
 * @swagger
 * /medicine-sales:
 *   get:
 *     summary: Obtiene un reporte de ventas de medicamentos con filtros y ordenamientos
 *     tags:
 *       - Ventas
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Orden de la lista por cantidad vendida
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *           default: "10"
 *         description: Número máximo de resultados a retornar
 *       - in: query
 *         name: filterByDate
 *         schema:
 *           type: string
 *           enum: [true, false]
 *           default: false
 *         description: Si se filtra por rango de fechas
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha inicial para filtrar ventas (si filterByDate es true)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha final para filtrar ventas (si filterByDate es true)
 *     responses:
 *       200:
 *         description: Reporte de ventas de medicamentos
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
 *                       medicamentoId:
 *                         type: integer
 *                         example: 1
 *                       nombre:
 *                         type: string
 *                         example: Paracetamol 500mg
 *                       empresa:
 *                         type: string
 *                         example: FarmaNova S.A.
 *                       cantidadVendida:
 *                         type: integer
 *                         example: 150
 *                       fecha:
 *                         type: string
 *                         example: 01 de enero de 2025
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
 *                         example: Descripcion
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error interno del servidor
 */

medicineRouter.get("/getMedicineSale", getMedicineSales);

/**
 * @swagger
 * /medicine-stock:
 *   get:
 *     summary: Obtiene el stock disponible de los medicamentos
 *     tags:
 *       - Medicamentos
 *     responses:
 *       200:
 *         description: Lista de medicamentos con su stock disponible
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   descripcion:
 *                     type: string
 *                     example: Paracetamol 500mg
 *                   cantidad:
 *                     type: integer
 *                     example: 50
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

medicineRouter.get("/getMedicineStock", getMedicineStock);

medicineRouter.post("/createMedicine", upload.single("imagen"), createMedicine);
medicineRouter.post("/updateMedicine", upload.single("imagen"), updateMedicine);



export default medicineRouter;
