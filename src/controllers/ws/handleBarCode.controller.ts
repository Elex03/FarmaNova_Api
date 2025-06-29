// controllers/textController.ts
import { WebSocketServer, WebSocket } from "ws";

export function handleBarCode(wss: WebSocketServer, ws: WebSocket, text: string) {
  console.log("Mensaje recibido:", text);

  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "text", data: text }));
    }
  });

  ws.send(JSON.stringify({ status: "success", message: "Texto enviado correctamente." }));
}
