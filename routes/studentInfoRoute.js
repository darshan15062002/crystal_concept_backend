const express = require('express')
const { createStudentInfo, getStudentInfo, deleteTransaction } = require('../controllers/studentInfoController.js')
const { isAuthenticated, isAdmin } = require('../middleware/auth.js')

const router = express.Router();



router.post('/student/student-info',isAuthenticated,isAdmin,createStudentInfo)
router.get('/student/student-info/:id',isAuthenticated,isAdmin, getStudentInfo)
router.delete('/student/student-info/:id',isAuthenticated,isAdmin, deleteTransaction)
module.exports = router