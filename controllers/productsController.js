const productsData = require("../Data.json");
const productsData2 = require("../Data2.json");
const productsData3 = require("../Data3.json");
const HomeData = require("../HomeData.json");
const Product = require("../models/ProductModel");
const { fetchData, fetchProductDetails } = require("../services/products");

// Controller function for creating a new product
const createProduct = async (req, res) => {
  try {
    const products = await Product.insertMany(productsData3);
    res.status(201).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAll = async (req, res) => {
  try {
    const { offset = 0, limit = 20 } = req.query;
    const products = await fetchData(offset, limit);
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
const getProductDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await fetchProductDetails(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = {
  getAll,
  getHomeData,
  getProductDetails,
  createProduct,
};
