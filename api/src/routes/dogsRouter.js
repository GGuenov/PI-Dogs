const { Router } = require("express");
const {
  getDogsHandler,
  getDetailsHandler,
  getRazassHandler,
  createDogHandler,
  editDogHandler,
  deleteDogHandler,
  getOnlyDBDogsHandler,
} = require("../handlers/todosLosHandlers");

const dogsRouter = Router();
dogsRouter.get("/", getDogsHandler);
dogsRouter.get("/editables", getOnlyDBDogsHandler);

dogsRouter.get("/:name", getDetailsHandler);
dogsRouter.get("/name?=", getRazassHandler);

dogsRouter.post("/", createDogHandler);
dogsRouter.put("/edit", editDogHandler);
dogsRouter.delete("/delete", deleteDogHandler);

module.exports = dogsRouter;
