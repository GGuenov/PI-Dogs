const express = require("express");
const cors = require("cors");

const morgan = require("morgan");
const mainRouter = require("./routes/mainRouter");

const app = express();

app.use(cors());

app.use(morgan("dev"));

//server.name = "API";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(express.json()); // parseador

app.use(mainRouter);

module.exports = app;
