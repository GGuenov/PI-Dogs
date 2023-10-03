const { Router } = require("express");
const {
  getDBCatsHandler,
  getDBCatsByIdHandler,
} = require("../controllers/getAllCats");

const catsRouter = Router();

catsRouter.get("/:id", (req, res) => {
  getDBCatsByIdHandler;
});

module.exports = catsRouter;
