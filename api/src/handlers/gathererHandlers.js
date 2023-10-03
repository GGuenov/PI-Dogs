const {
  dogIngester,
  catIngester,
} = require("../controllers/gathererControlers");

const dogIngesterHandler = async (req, res) => {
  try {
    const response = await dogIngester();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const catIngesterHandler = async (req, res) => {
  try {
    const response = await catIngester();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { dogIngesterHandler, catIngesterHandler };
