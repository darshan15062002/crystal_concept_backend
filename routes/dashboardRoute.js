const express = require('express')
const { isAuthenticated, isAdmin } = require('../middleware/auth')
const { getDashboard } = require('../controllers/dashboardController')

const router = express.Router()

router.get("/admin/dashboard", isAuthenticated, isAdmin, getDashboard)

module.exports = router