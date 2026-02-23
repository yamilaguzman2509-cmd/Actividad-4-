const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/authMiddleware');


router.get('/', productController.getProducts);


router.post('/', auth, productController.createProduct);

module.exports = router;
