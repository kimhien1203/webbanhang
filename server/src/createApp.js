const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { useRoutes } = require("./routes");
const { mongooseConnect } = require("../util/connectDB");
const { sessionMiddleware, corsConfig } = require("../util/serverUtil");

async function createApp(httpServer) {
  mongooseConnect()
    .then(() => console.log("Connected to DB 💾"))
    .catch((err) => console.log(err));
  const app = createExpressApp();
  httpServer.on("request", app);

  app.use(cors(corsConfig));

  // const io = new Server(httpServer, {
  //   cors: corsConfig,
  // });

  // initAuth(app, io);
  initAuth(app);
  // initIOEvent(io);

  useRoutes(app);
  app.use(handleErrors);
}

function createExpressApp() {
  const app = express();

  app.enable("trust proxy");
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use(function (req, res, next) {
    res.header("Content-Type", "application/json;charset=UTF-8");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  return app;
}

function initAuth(app, io) {
  app.use(sessionMiddleware);
  // io.engine.use(sessionMiddleware);
}

function handleErrors(error, req, res, next) {
  const status = error.statusCode || 500;
  const message = error.message;
  const errors = error.errors;
  res.status(status).send({ message: message, errors: errors });
}

module.exports = { createApp }; 