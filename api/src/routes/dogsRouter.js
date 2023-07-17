const { Router } = require("express");

const {
  getDogsHandler,
  getDetailsHandler,
  getRazassHandler,
  getAllTemperamentsHandler,
  createDogHandler,
} = require("../handlers/todosLosHandlers");

const dogsRouter = Router();

dogsRouter.get("/", getDogsHandler);

dogsRouter.get("/:idRaza", getDetailsHandler);

dogsRouter.get("/name?=", getRazassHandler);

dogsRouter.get("/temperaments", getAllTemperamentsHandler);

dogsRouter.post("/", createDogHandler);

module.exports = dogsRouter;
