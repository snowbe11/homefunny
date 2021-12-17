import express, { Request, Response } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import apiRouter from "./router";
import bindAll from "./logic/socket";
import path from "path";
import compression from "compression";

const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router setting
app.use("/", apiRouter);

app.use(compression());

const webglBinFolder: string = path.join(__dirname, "/client");
app.use(express.static(webglBinFolder));

app.use((req: Request, res: Response) => {
  res.sendFile(path.join(webglBinFolder, "index.html"));

  // const fileURL = webglBinFolder + "/index.html";
  // const extname = path.extname("/index.html");

  // fs.readFile(fileURL, function (err, data) {
  //   if (err) {
  //     res.writeHead(404, { "Content-Type": "text/html;charset=UTF8" });
  //     res.end("404,Request file does not exist:" + fileURL);
  //   }

  //   getMime(extname, (mime: string) => {
  //     res.writeHead(200, { "Content-Type": mime });
  //     res.end(data);
  //     console.log("extname:" + extname);
  //   });
  // });
});

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
