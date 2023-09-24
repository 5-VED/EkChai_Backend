const express = require("express")
const router = express.Router()
const { authenticateToken, checkRole } = require('../Config/authenticate')
const { dashboardDetails } = require('../Controllers/dashboard.controller')

//Api to get details on dashboard
router.get('/details', dashboardDetails)


module.exports = router;