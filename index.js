const http = require("http");
const querystring = require("querystring");
const { StringDecoder } = require("string_decoder");
const config = require("./config");
const handlers = require("./lib/handlers");

// data
//   .update("test", "testfile", { foo2: "bar2" })
//   .then(() => data.read("test", "testfile"))
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

const server = http.createServer((req, res) => {
  const protocol = req.connection.encripted ? "https://" : "http://";
  const baseURL = protocol + req.headers.host;
  const url = new URL(req.url, baseURL);
  const path = url.pathname;
  const trimmedPath = path.replace(/^\/+|\/$/g, "");
  const method = req.method.toLowerCase();
  const queryObject = querystring.parse(url.search.replace(/^\?/, ""));
  const headers = req.headers;

  const stringDecoder = new StringDecoder("utf8");
  let bufferString = "";
  req.on("data", data => {
    bufferString += stringDecoder.write(data);
  });
  req.on("end", () => {
    bufferString += stringDecoder.end();
    const chosenHandler = typeof router[trimmedPath] !== "undefined" ? router[trimmedPath] : handlers.notFound;
    const data = {
      method: method,
      queryObject: queryObject,
      headers: headers,
      payload: bufferString
    };

    chosenHandler(data, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 200;
      payload = typeof payload === "object" ? payload : {};
      const payloadString = JSON.stringify(payload);
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
});

server.listen(config.port, () => {
  console.log("The server is listening on port", config.port, "in", config.nameEnv, "mode");
});

const router = {
  ping: handlers.ping,
  users: handlers.users
};
