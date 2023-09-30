const { Router } = require("express");
const { dogIngesterHandler } = require("../handlers/gathererHandlers");

const ingestsRouter = Router();

ingestsRouter.get("/", dogIngesterHandler);
module.exports = { ingestsRouter };
