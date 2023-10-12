const productsData3 = require("../Data3.json");
const Product = require("../models/ProductModel");

// const fetchData = (offset, limit) => {
//   const startIndex = parseInt(offset);
//   const endIndex = startIndex + parseInt(limit);
//   const paginatedProducts = productsData3.slice(startIndex, endIndex);
//   return paginatedProducts;
// };
const fetchData = async (offset, limit) => {
  const products = await Product.find({ is_in_inventory: true })
    .skip(parseInt(offset, 10)) // Convert offset to a number
    .limit(parseInt(limit, 10)) // Convert limit to a number
    .exec();
    const totalCount = await Product.countDocuments({ is_in_inventory: true });
  return {totalCount,products};
};
const fetchProductDetails = async (_id) => {
    const product = await Product.findById(_id);
    return product;
  };

module.exports = {
  fetchData,
  fetchProductDetails,
};
