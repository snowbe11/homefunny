import { Server, Socket } from "socket.io";

// 단순한 루프백 핸들링
export const bindEventRelayReceived = (
  socket: Socket,
  server: Server,
  eventName: string
) => {
  console.log("socket.on relay");

  socket.on(eventName, (eventData) => server.emit(eventName, eventData));
};

export type ChatMessageType = {
  name: string;
  message: string;
};

export const bindEventChatMessageReceived = (
  socket: Socket,
  server: Server
) => {
  socket.on("message", ({ name, message }: ChatMessageType) => {
    // debug
    console.log("socket.on message");

    server.emit("message", { name, message });
  });
};

export const onDisconnect = (socket: Socket) => {
  socket.on("disconnect", () => {
    console.log(`disconnected ${socket.id}`);
  });
};

export const bindAll = ({
  socket,
  server,
}: {
  socket: Socket;
  server: Server;
}) => {
  // map callbacks
  bindEventRelayReceived(socket, server, "echo");
  bindEventChatMessageReceived(socket, server);
};

export default bindAll;
