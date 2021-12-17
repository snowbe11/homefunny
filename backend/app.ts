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
import bindAll from "./logic/socket";
app.use("/", apiRouter);

const httpServer = http.createServer(app);

// cors
const socketServer = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// server content

socketServer.on("connection", (socket: Socket) => {
  //console.log(socket);
  console.log(`connected with ${socket.id}`);

  bindAll({ socket, server: socketServer });
});

const port = process.env.PORT || 4000;

httpServer.listen(port, () => {
  console.log(`listening on port ${port}`);
});
