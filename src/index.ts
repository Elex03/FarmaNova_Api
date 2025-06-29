import express from 'express';
import cors from 'cors';
import appRouter from './router/';
import morgan from 'morgan';
import http from 'http';
import WebSocket from 'ws';
import path from 'path';
import fs from 'fs';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/apiFarmaNova', appRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


wss.on('connection', (ws) => {
  console.log("Nuevo cliente conectado");

  ws.on("message", (message: string | Buffer) => {
    try {
      const parsed = JSON.parse(message.toString());

      if (parsed.type === "image" && parsed.data) {
        const base64Data = parsed.data;
        const fileName = `image_${Date.now()}.jpg`;
        const buffer = Buffer.from(base64Data, "base64");
        const filePath = path.join(__dirname, "uploads", fileName);

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

          // Enviar a todos los clientes conectados
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: "image",
                data: imageUrl,
              }));
            }
          });

          // Confirmar al cliente que la subió
          ws.send(JSON.stringify({
            status: "success",
            message: `Imagen guardada como ${fileName}`,
            imageUrl,
          }));
        });
      } else {
        // Reenviar mensaje general
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
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});

// Iniciar servidor
server.listen(3000, () => {
  console.log(`API escuchando en el puerto ${PORT}`);
});
