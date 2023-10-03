const { Router } = require("express");
const dogsRouter = require("./dogsRouter");
const catsRouter = require("./catsRouter");
const { tempsRouter } = require("../controllers/getTemperamentsData");
const { ingestsRouter } = require("./ingestsRouter");

const mainRouter = Router();

mainRouter.use("/dogs", dogsRouter);
mainRouter.use("/cats", catsRouter);
mainRouter.use("/temperaments", tempsRouter);
mainRouter.use("/ingests", ingestsRouter);

module.exports = mainRouter;
