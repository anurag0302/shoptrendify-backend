const productsController = require("../controllers/productsController");
const express = require("express");
const router = express.Router();

router.get('/products', productsController.getAll);


module.exports = router;