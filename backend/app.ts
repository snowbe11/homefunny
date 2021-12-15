import ProxyServer from "./cors-proxy";

const server = new ProxyServer();
server.start("localhost", 3001);
