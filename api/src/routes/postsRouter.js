const { Router } = require("express");
const { createDogHandler } = require("../handlers/todosLosHandlers");

const postsRouter = Router();

postsRouter.post("/dogs", createDogHandler);

module.exports = postsRouter;
