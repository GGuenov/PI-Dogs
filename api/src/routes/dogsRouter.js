const { Router } = require("express");

const {
  getDogsHandler,
  getRazaHandler,
  getRazassHandler,
  getTemperamentsHandler,
} = require("../handlers/todosLosHandlers");

const dogsRouter = Router();

dogsRouter.get("/dogs", getDogsHandler);

dogsRouter.get("/dogs/:idRaza", getRazaHandler);

dogsRouter.get("/dogs/name?", getRazassHandler);

dogsRouter.get("/temperaments", getTemperamentsHandler);

module.exports = dogsRouter;
