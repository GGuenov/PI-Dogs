const { Router } = require("express");
const { getAllTemperamentsHandler } = require("../handlers/todosLosHandlers");

const tempsRouter = Router();

tempsRouter.get("/", getAllTemperamentsHandler);

module.exports = tempsRouter;
