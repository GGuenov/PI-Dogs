const { Router } = require("express");
const dogsRouter = require("./dogsRouter");
//const postsRouter = require("./postsRouter");

const mainRouter = Router();

mainRouter.use("/dogs", dogsRouter);

module.exports = mainRouter;
