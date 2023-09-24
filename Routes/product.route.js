const express = require('express');
const router = express.Router();
const { addProduct, getProducts, getProductById, deleteProduct, getProductByCategoryId, updateProduct, updateStatus } = require('../Controllers/product.controller');
const { authenticateToken, checkRole } = require('../Config/authenticate');

router.post('/addProduct', authenticateToken, checkRole, addProduct);
router.get('/getProducts', getProducts);
router.get('/getProduct/:id', authenticateToken, getProductById);
router.get('/getCategory/:id', authenticateToken, getProductByCategoryId);
router.delete('/deleteProduct/:id', authenticateToken, checkRole, deleteProduct);
router.put('/updateProduct', authenticateToken, checkRole, updateProduct);
router.put('/updateStatus', authenticateToken, checkRole, updateStatus);

module.exports = router;
