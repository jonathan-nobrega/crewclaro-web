import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(projectId: string): Socket {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_WS_URL!, { withCredentials: true });
  }
  socket.emit("project.join", { projectId });
  return socket;
}

export type RealtimeEvent = "message.created" | "message.translated" | "task.updated";
