import express from 'express';
import cors from 'cors';
import appRouter from './router';
import morgan from 'morgan';
import http from 'http';
import WebSocket from 'ws';
import path from 'path';
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './utils/swagger'
import { handleMessage } from './controllers/ws/ws.controller';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/apiFarmaNova', appRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

wss.on("connection", (ws) => {
  console.log("Nuevo cliente conectado");

  ws.on("message", (message) => {

    handleMessage(wss, ws, String(message));
  });

  ws.on("error", (error) => {
    console.error("Error en WebSocket:", error);
    ws.send(JSON.stringify({
      status: "error",
      message: "Error en la conexión WebSocket.",
    }));
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});

server.listen(PORT, () => {
  console.log(`API escuchando en el puerto ${PORT}`);
});


