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

dogsRouter.get("/:name", getDetailsHandler);
// dogsRouter.get("/name?=", (req, res) => {
//   res.send("por rasa");
// });
//  getRazassHandler);
dogsRouter.get("/temperaments", getAllTemperamentsHandler);

dogsRouter.post("/", createDogHandler);

module.exports = dogsRouter;
