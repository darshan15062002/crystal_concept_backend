const express = require('express')
const { createStudentInfo, getStudentInfo } = require('../controllers/studentIndoController.js')
const { isAuthenticated, isAdmin } = require('../middleware/auth.js')

const router = express.Router();



router.post('/student/student-info',isAuthenticated,isAdmin,createStudentInfo)
router.get('/student/student-info/:id',isAuthenticated,isAdmin,getStudentInfo)
module.exports = router