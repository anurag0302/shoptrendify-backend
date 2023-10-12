const productsController = require("../controllers/productsController");
const express = require("express");
const router = express.Router();

router.get('/products', productsController.getAll);
router.get('/productDetails/:id', productsController.getProductDetails);   

router.get('/home', productsController.getHomeData);

router.post('/create', productsController.createProduct);



module.exports = router;