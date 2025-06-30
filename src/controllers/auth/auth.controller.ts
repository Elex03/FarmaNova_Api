import { Request, Response } from "express";
import { Prismaclient } from "../../constants/db";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";

type UserRole = "ADMINISTRADOR" | "EMPLEADO";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const user = await Prismaclient.usuario.findFirst({
    where: { correo: email },
  });

  if (!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const isPasswordValid = compareSync(password, user.contrase_a);

  if (!isPasswordValid) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const token = jwt.sign(
    { userId: user.usuario_pk, role: user.rol },
    "your_jwt_secret",
    { expiresIn: "3d" }
  );

  const refreshToken = jwt.sign(
    { userId: user.usuario_pk, role: user.rol },
    "your_jwt_secret",
    { expiresIn: "7d" }
  );

  res.status(200).json({
    message: "Login successful",
    token,
    refreshToken,
    role: user.rol,
  });
};

export const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    res.status(400).json({ error: "Email, password, and role are required" });
  }

  try {
    const checkUser = await Prismaclient.usuario.findFirst({
      where: { correo: email },
    });

    if (checkUser) {
      res.status(409).json({ error: "User already exists" });
      return;
    }

    const registerUser = await Prismaclient.usuario.create({
      data: {
        correo: email,
        contrase_a: hashSync(password, 10),
        rol: role as UserRole,
        fechacreacion: new Date(),
      },
    });
    if (!registerUser) {
      res.status(500).json({ error: "Failed to create user" });
      return;
    }
    res
      .status(201)
      .json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const refreshToken = (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({ error: "Refresh token is required" });
    return;
  }

  try {
    const decoded = jwt.verify(refreshToken, "your_jwt_secret") as {
      userId: number;
      role: string;
    };

    // Generar nuevo access token
    const newAccessToken = jwt.sign(
      {
        userId: decoded.userId,
        role: decoded.role,
      },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    const newRefreshToken = jwt.sign(
      {
        userId: decoded.userId,
        role: decoded.role,
      },
      "your_jwt_secret",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token: newAccessToken,
      refreshToken: newRefreshToken,
      role: decoded.role,
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired refresh token" });
    return;
  }
};
