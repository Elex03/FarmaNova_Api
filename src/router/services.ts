import {Router} from 'express';
import { getMedicinePerCoincidence } from '../controllers/services/whatsapp.controller';


const serviceRoute = Router();

/**
 * @swagger
 * /medicines/search:
 *   post:
 *     summary: Buscar medicamentos por coincidencia parcial en la descripción
 *     tags:
 *       - Medicamentos
 *     requestBody:
 *       description: Cadena a buscar dentro de las descripciones de medicamentos
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: paracetamol
 *     responses:
 *       200:
 *         description: Lista de medicamentos que coinciden con la búsqueda
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
 *       500:
 *         description: Error interno al buscar medicamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Error al buscar medicamentos
 */

serviceRoute.get('/', getMedicinePerCoincidence);


export default serviceRoute;