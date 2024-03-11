const express = require('express')
const { createStudentInfo } = require('../controllers/studentIndoController.js')
const { isAuthenticated, isAdmin } = require('../middleware/auth.js')

const router = express.Router();



router.post('/student/student-info',isAuthenticated,isAdmin,createStudentInfo)
// router.get('/student/student-info/:id')