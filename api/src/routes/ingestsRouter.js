const { Router } = require("express");
const {
  dogIngesterHandler,
  catIngesterHandler,
} = require("../handlers/gathererHandlers");

const ingestsRouter = Router();

ingestsRouter.get("/dogs", dogIngesterHandler);
ingestsRouter.get("/cats", catIngesterHandler);

module.exports = { ingestsRouter };
