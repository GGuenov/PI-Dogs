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
dogsRouter.get("/name?=", (req, res) => {
  res.send("por rasa");
});
//  getRazassHandler);

dogsRouter.post("/", createDogHandler);

module.exports = dogsRouter;

// dogsRouter.get("/temperaments", getAllTemperamentsHandler);
