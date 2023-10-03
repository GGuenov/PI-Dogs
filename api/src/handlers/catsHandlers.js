const {
  getAllCats,
  getDBCats,
  getDBCatsById,
} = require("../controllers/getAllCats");

const getDBCatsByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getDBCatsById(id);
    res.status(200).json(response);
  } catch (error) {
    res.staus(500).json({ message: error.message });
  }
};

module.exports = { getDBCatsByIdHandler };
