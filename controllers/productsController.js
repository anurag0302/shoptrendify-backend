const productsData = require("../Data.json");


const fetchData = (offset, limit) => {
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = productsData.slice(startIndex, endIndex);
    return paginatedProducts;
  };

const getAll = async (req, res) => {
  try {
    const { offset = 0, limit = 2 } = req.query;
    const products = fetchData(offset, limit);
    res.status(200).json(products);
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = {
  getAll,
};
