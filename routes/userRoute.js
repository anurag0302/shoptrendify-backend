const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();


router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/verify/:id', userController.verifyTokenLogin);




module.exports = router;