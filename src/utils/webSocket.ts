import WebSocket from "ws";
import fs from "fs";
import path from "path";
import { app } from "../index";

import http from 'http';

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

export const wssCallBack = (ws: WebSocket) => {
  console.log("Nuevo cliente conectado");
  ws.send("¡Bienvenido al servidor WebSocket!");

  ws.on("message", (message: string | Buffer) => {
    try {
      const parsed = JSON.parse(message.toString());

      if (parsed.type === "image" && parsed.data) {
        const base64Data = parsed.data;

        // Generar un nombre único para la imagen
        const fileName = `image_${Date.now()}.jpg`;

        // Convertir base64 a buffer y guardar en disco
        const buffer = Buffer.from(base64Data, "base64");
        const filePath = path.join(__dirname, "uploads", fileName);

        fs.writeFile(filePath, buffer, (err) => {
          if (err) {
            console.error("Error al guardar imagen:", err);
            ws.send(
              JSON.stringify({
                status: "error",
                message: "No se pudo guardar la imagen.",
              })
            );
          } else {
            console.log(`Imagen guardada: ${filePath}`);

            // Enviar la imagen a todos los clientes conectados
            const imageUrl = `http://localhost:3000/uploads/${fileName}`;
            wss.clients.forEach((client) => {
              if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(
                  JSON.stringify({
                    type: "image",
                    data: imageUrl,
                  })
                );
              }
            });

            // Confirmación al cliente que subió la imagen
            ws.send(
              JSON.stringify({
                status: "success",
                message: `Imagen recibida y guardada como ${fileName}`,
                imageUrl,
              })
            );
          }
        });
      } else {
        // Mensajes normales, reenviar a otros clientes
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      }
    } catch (err) {
      console.error("Error al procesar mensaje:", err);
      ws.send(
        JSON.stringify({ status: "error", message: "Mensaje inválido." })
      );
    }
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
}
