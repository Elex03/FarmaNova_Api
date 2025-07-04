import { Router } from "express";
import { getDetailsSales, getOneOrderHistory, getOrdersGraph, getSales, registerOrder } from "../controllers/orders";


const orderRoute = Router();

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Obtiene la lista de ventas con detalles agregados
 *     tags:
 *       - Ventas
 *     responses:
 *       200:
 *         description: Lista de ventas con cantidad total, fecha, hora y monto total
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
 *                         type: integer
 *                         example: 1
 *                       cantidad:
 *                         type: integer
 *                         example: 5
 *                       fechaventa:
 *                         type: string
 *                         example: 04 de julio de 2025
 *                       horaventa:
 *                         type: string
 *                         example: 14:30:15
 *                       total:
 *                         type: string
 *                         example: "125.50"
 *                 headers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       key:
 *                         type: string
 *                         example: cantidad
 *                       header:
 *                         type: string
 *                         example: Cantidad de medicamentos vendidos
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

orderRoute.get('/getSales', getSales);

/**
 * @swagger
 * /sales/{id}:
 *   get:
 *     summary: Obtiene los detalles de una venta específica
 *     tags:
 *       - Ventas
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la venta
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalles de la venta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 cliente:
 *                   type: string
 *                   example: Ana López
 *                 fecha:
 *                   type: string
 *                   example: "2025-04-21"
 *                 total:
 *                   type: number
 *                   example: 150.0
 *                 productos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombre:
 *                         type: string
 *                         example: Paracetamol 500mg
 *                       precio:
 *                         type: number
 *                         example: 25.0
 *                       cantidad:
 *                         type: integer
 *                         example: 3
 *                       total:
 *                         type: number
 *                         example: 75.0
 *       404:
 *         description: Venta no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Venta no encontrada
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

orderRoute.get('/getSales/:id', getDetailsSales);

/**
 * @swagger
 * /order-history/{id}:
 *   get:
 *     summary: Obtiene el historial de pedidos de un distribuidor específico
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del distribuidor
 *         example: 1
 *     responses:
 *       200:
 *         description: Historial de pedidos del distribuidor
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
 *                         type: integer
 *                         example: 1
 *                       nombre:
 *                         type: string
 *                         example: Juan Pérez
 *                       empresa:
 *                         type: string
 *                         example: FarmaNova S.A.
 *                       fechaPedido:
 *                         type: string
 *                         example: 04/07/2025
 *                       hora:
 *                         type: string
 *                         nullable: true
 *                         example: 14:30:00
 *                       estado:
 *                         type: string
 *                         example: Completado
 *                       total:
 *                         type: string
 *                         example: "150.00"
 *                       fechaEntrega:
 *                         type: string
 *                         nullable: true
 *                         example: 05/07/2025
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
 *                       isHighlight:
 *                         type: boolean
 *                         example: true
 *                       isNumeric:
 *                         type: boolean
 *                         example: false
 *                       isDate:
 *                         type: boolean
 *                         example: false
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

orderRoute.get('/details/:id', getOneOrderHistory);

/**
 * @swagger
 * /orders-graph/{id}:
 *   get:
 *     summary: Obtiene la cantidad de pedidos por mes para un distribuidor específico
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del distribuidor
 *         example: 1
 *     responses:
 *       200:
 *         description: Cantidad de pedidos por mes (array de 12 números, índices 0 a 11 representan enero a diciembre)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: integer
 *               example: [2, 0, 5, 3, 6, 0, 1, 0, 4, 2, 1, 0]
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

orderRoute.get('/getOrderGraph/:id', getOrdersGraph);

/**
 * @swagger
 * /register-order:
 *   post:
 *     summary: Registra un nuevo pedido con sus detalles y actualiza el stock
 *     tags:
 *       - Pedidos
 *     requestBody:
 *       description: Array con los detalles del pedido
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 distribuidor:
 *                   type: integer
 *                   description: ID del distribuidor
 *                   example: 1
 *                 nombreMedicamento:
 *                   type: integer
 *                   description: ID del medicamento
 *                   example: 10
 *                 fecha_expiracion:
 *                   type: string
 *                   format: date
 *                   description: Fecha de expiración del medicamento
 *                   example: "2025-12-31"
 *                 cantidadDeEmpaque:
 *                   type: integer
 *                   description: Cantidad de empaques
 *                   example: 5
 *                 cantidadPorEmpaque:
 *                   type: integer
 *                   description: Unidades por empaque
 *                   example: 20
 *                 nroLote:
 *                   type: string
 *                   description: Número de lote (opcional)
 *                   example: "L-12345"
 *                 total:
 *                   type: number
 *                   description: Total del detalle
 *                   example: 100.50
 *     responses:
 *       201:
 *         description: Pedido y detalles registrados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pedido y detalles registrados correctamente
 *                 pedido:
 *                   type: object
 *                   description: Datos del pedido creado
 *                 detalles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Detalles del pedido creados
 *       400:
 *         description: No se enviaron detalles del pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se enviaron detalles del pedido.
 *       500:
 *         description: Error interno al registrar el pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hubo un error al registrar el pedido
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */

orderRoute.post('/registerOrder', registerOrder);

export default orderRoute;