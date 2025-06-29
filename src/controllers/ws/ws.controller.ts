// controllers/wsController.ts
import { WebSocketServer, WebSocket } from "ws";
import { handleImage } from "./sendImage.controller";
import { handleBarCode } from "./handleBarCode.controller";

export function handleMessage(wss: WebSocketServer, ws: WebSocket, message: string | Buffer) {
  try {
    const parsed = JSON.parse(message.toString());

    switch (parsed.type) {
      case "image":
        handleImage(wss, ws, parsed.data);
        break;
      case "text":
        handleBarCode(wss, ws, parsed.data);
        break;
      default:
        ws.send(JSON.stringify({ status: "error", message: "Tipo de mensaje no soportado." }));
    }
  } catch (err) {
    console.error("Error al procesar mensaje:", err);
    ws.send(JSON.stringify({ status: "error", message: "Mensaje inválido." }));
  }
}
