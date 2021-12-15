const HttpServer = require("http");
const HttpsServer = require("https");

class ProxyServer {
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

  start = (host, port = 8080) => {
    if (this.proxy) {
      this.proxy.listen(port, host, function () {
        console.log("Running CORS Anywhere on " + host + ":" + port);
      });
    } else {
      console.log("cors_proxy server instance is null");
    }
  };

  parseEnvList = (env) => {
    if (!env) {
      return [];
    }

    return env.split(",");
  };
}

module.exports = new ProxyServer();
