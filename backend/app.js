const host = process.env.HOST ? process.env.HOST : "localhost";
const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

const server = require("./proxy");
server.start(host, port);
