import { Server as HttpServer } from "http";
import { Server as HttpsServer } from "https";

export class ProxyServer {
  proxy: HttpServer | HttpsServer;

  originBlacklist: Array<string>;
  originWhitelist: Array<string>;

  constructor() {
    this.originBlacklist = this.parseEnvList("");
    this.originWhitelist = this.parseEnvList("");

    const cors_proxy = require("./lib/cors-anywhere");
    this.proxy = cors_proxy.createServer({
      originBlacklist: this.originBlacklist,
      originWhitelist: this.originWhitelist,
      requireHeader: ["origin", "x-requested-with"],
      checkRateLimit: {},
      removeHeaders: [
        "cookie",
        "cookie2",
        // Strip Heroku-specific headers
        "x-request-start",
        "x-request-id",
        "via",
        "connect-time",
        "total-route-time",
        // Other Heroku added debug headers
        // 'x-forwarded-for',
        // 'x-forwarded-proto',
        // 'x-forwarded-port',
      ],
      redirectSameOrigin: true,
      httpProxyOptions: {
        // Do not add X-Forwarded-For, etc. headers, because Heroku already adds it.
        xfwd: false,
      },
    });
  }

  start = (host: string, port = 8080) => {
    if (this.proxy) {
      this.proxy.listen(port, host, function () {
        console.log("Running CORS Anywhere on " + host + ":" + port);
      });
    } else {
      console.log("cors_proxy server instance is null");
    }
  };

  parseEnvList = (env: string): Array<string> => {
    if (!env) {
      return [];
    }

    return env.split(",");
  };
}

export default ProxyServer;
