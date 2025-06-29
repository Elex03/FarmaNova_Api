import { WebSocketServer, WebSocket } from "ws";
import fs from "fs";
import path from "path";

const PORT = process.env.PORT || 3000;

export function handleImage(wss: WebSocketServer, ws: WebSocket, message: string | Buffer) {
  try {
    const parsed = JSON.parse(message.toString());

    if (parsed.type === "image" && parsed.data) {
      const base64Data = parsed.data;
      const fileName = `image_${Date.now()}.jpg`;
      const buffer = Buffer.from(base64Data, "base64");
      const filePath = path.join(__dirname, "..", "uploads", fileName);

      fs.writeFile(filePath, buffer, (err) => {
        if (err) {
          console.error("Error al guardar imagen:", err);
          ws.send(JSON.stringify({
            status: "error",
            message: "No se pudo guardar la imagen.",
          }));
          return;
        }

        console.log(`Imagen guardada: ${filePath}`);
        const imageUrl = `http://localhost:${PORT}/uploads/${fileName}`;

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: "image",
              data: imageUrl,
            }));
          }
        });

        ws.send(JSON.stringify({
          status: "success",
          message: `Imagen guardada como ${fileName}`,
          imageUrl,
        }));
      });

    } else {
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
  } catch (err) {
    console.error("Error al procesar mensaje:", err);
    ws.send(JSON.stringify({
      status: "error",
      message: "Mensaje inválido.",
    }));
  }
}
