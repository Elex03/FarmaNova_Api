import { Router } from "express";
import {
  login,
  refreshToken,
  register,
} from "../controllers/auth/auth.controller";

const authRouter = Router();

/**
 * @swagger
 * /apiFarmaNova/auth/login:
 *   post:
 *     summary: Inicia sesión en el sistema
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: Credenciales inválidas
 */
authRouter.post("/login", login);

/**
 * @swagger
 * /apiFarmaNova/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - nombre
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@correo.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *               role:
 *                 type: string
 *                 example: EMPLEADO
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario creado correctamente
 *       400:
 *         description: Datos inválidos o faltantes
 */
authRouter.post("/register", register);

/**
 * @swagger
 * /apiFarmaNova/auth/refresh-token:
 *   post:
 *     summary: Renueva el token de acceso usando el refreshToken
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *     responses:
 *       200:
 *         description: Nuevo token generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 role:
 *                   type: string
 *                   example: admin
 *       401:
 *         description: Refresh token inválido o expirado
 */

authRouter.post("/refresh-token", refreshToken);

export default authRouter;
