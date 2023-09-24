const express = require('express');
const router = express.Router();

const {generatePdf} = require('../Controllers/bill.controller');
// const {authenticateToken,checkRole} = require('../Config/authenticate')


router.post('/generatePdf',generatePdf);


module.exports = router;