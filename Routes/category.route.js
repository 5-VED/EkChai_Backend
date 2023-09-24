const express = require('express');
const router = express.Router();
const {authenticateToken, checkRole} = require('../Config/authenticate');
const {addCategory,updateCategories,getCategories} = require('../Controllers/category.controller');
const {categoryValidator} = require('../Utils/Validators/category.validator')

router.post('/add',authenticateToken,checkRole,categoryValidator,addCategory);
router.get('/get',authenticateToken,getCategories);
router.put('/update/:id',authenticateToken,checkRole,updateCategories);

module.exports = router;


