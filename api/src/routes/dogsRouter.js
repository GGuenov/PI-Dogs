const { Router } = require("express");
const {
  getDogsHandler,
  getDetailsHandler,
  getRazassHandler,
  createDogHandler,
} = require("../handlers/todosLosHandlers");

const dogsRouter = Router();
dogsRouter.get("/", getDogsHandler);

dogsRouter.get("/:name", getDetailsHandler);
dogsRouter.get("/name?=", getRazassHandler);

dogsRouter.post("/", createDogHandler);

module.exports = dogsRouter;
