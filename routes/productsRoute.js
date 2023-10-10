const productsController = require("../controllers/productsController");
const express = require("express");
const router = express.Router();

router.get('/products', productsController.getAll);
router.get('/home', productsController.getHomeData);



module.exports = router;