const productsData = require("../Data.json");
const productsData2 = require("../Data2.json");
const productsData3 = require("../Data3.json");
const HomeData = require("../HomeData.json");




const fetchData = (offset, limit) => {
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = productsData3.slice(startIndex, endIndex);
    return paginatedProducts;
  };

const getAll = async (req, res) => {
  try {
    const { offset = 0, limit = 20 } = req.query;
    const products = fetchData(offset, limit);
    // const products =productsData3;

    res.status(200).json(products);
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
const getHomeData = async (req, res) => {
    try {
      res.status(200).json(HomeData);
    } catch (error) {
      res.status(401).json({ message: "Token is not valid" });
    }
  };

module.exports = {
  getAll,
  getHomeData,
};
