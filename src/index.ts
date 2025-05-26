import express from 'express';
import cors from 'cors';
import appRouter from './router/';
import morgan from 'morgan';
import http from 'http';
import WebSocket from 'ws';
import path from 'path';
import { wssCallBack } from './utils/webSocket';

export const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/apiFarmaNova', appRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/favicon.ico', (_req, res) => {
  res.send('Hello');
});

wss.on('connection', (ws) => wssCallBack(ws));

server.listen(PORT, () => {
  console.log(`API escuchando en el puerto ${PORT} `);
});


