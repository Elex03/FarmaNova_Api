import { Router } from "express";
import {
  changePassword,
  deleteUser,
  getUsers,
  login,
  refreshToken,
  register,
  updateUser,
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

/**
 * @swagger
 * /apiFarmaNova/auth/users:
 *   get:
 *     summary: Obtener lista de usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
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
 *                   email:
 *                     type: string
 *                     example: usuario@example.com
 *                   role:
 *                     type: string
 *                     example: ADMIN
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-01-01T00:00:00Z
 *       500:
 *         description: Error interno del servidor
 */


authRouter.get("/users", getUsers);
/**
 * @swagger
 * /apiFarmaNova/auth/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */



authRouter.put("/users/:id", updateUser);
/**
 * @swagger
 * /apiFarmanova/auth/users/{id}:
 *   put:
 *     summary: Actualizar los datos de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 example: nuevoemail@ejemplo.com
 *               role:
 *                 type: string
 *                 enum: [ADMIN, USER]
 *                 example: USER
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Datos faltantes
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */



authRouter.delete("/users/:id", deleteUser);

/**
 * @swagger
 * /apiFarmaNova/auth/users/{id}/change-password:
 *   post:
 *     summary: Cambiar la contraseña de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: nuevaContraseña123
 *     responses:
 *       200:
 *         description: Contraseña cambiada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password changed successfully
 *       400:
 *         description: Datos faltantes o inválidos
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

authRouter.post("/users/:id/change-password", changePassword);

export default authRouter;
