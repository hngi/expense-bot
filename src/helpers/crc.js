const { validateSignature, validateWebhook } = require("twitter-autohook");
const url = require("url");
const config = require("../config");

const auth = config.auth;

module.exports = function(req, res, next) {
  if (req.query.crc_token) {
    try {
      if (!validateSignature(req.headers, auth, url.parse(req.url).query)) {
        console.error("Cannot validate webhook signature");
        return;
      }
    } catch (e) {
      console.error(e);
    }

    const crc = validateWebhook(req.query.crc_token, auth, res);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(crc));
  } else {
    next();
  }

  if (
    req.method === "POST" &&
    req.headers["content-type"] === "application/json"
  ) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        if (!validateSignature(req.headers, auth, body)) {
          console.error("Cannot validate webhook signature");
          return;
        }
      } catch (e) {
        console.error(e);
      }

      console.log("Event received:", body);
      res.writeHead(200);
      res.end();
    });
  }
};
