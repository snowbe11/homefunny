import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router setting
import apiRouter from "./router";
app.use("/", apiRouter);

// // call back to all
// app.use((req, res, next) => {
//   const { url } = req;
//   if (url) {
//     console.log(url);
//     console.log(req.params);

//     const responce = proxyRequest(url);
//     res.json(responce);
//   }

//   next();
// });

const server = http.createServer(app);

const socketio = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// server content

// 단순한 루프백 핸들링
const bindEventRelayReceived = (
  socket: Socket,
  socketio: Server,
  eventName: string
) => {
  socket.on(eventName, (eventData) => socketio.emit(eventName, eventData));
};

const bindEventChatMessageReceived = (socket: Socket, socketio: Server) => {
  socket.on("message", ({ name, message }) => {
    // debug
    console.log("socket.on message");

    socketio.emit("message", "server hello !");
  });
};

const onDisconnect = (socket: Socket) => {
  socket.on("disconnect", () => {
    console.log(`disconnected ${socket.id}`);
  });
};

socketio.on("connection", (socket: Socket) => {
  //console.log(socket);
  console.log(`connected with ${socket.id}`);

  // map callbacks
  bindEventRelayReceived(socket, socketio, "echo");
  bindEventChatMessageReceived(socket, socketio);
});

server.listen(4000, () => {
  console.log("listening on port 4000");
});
