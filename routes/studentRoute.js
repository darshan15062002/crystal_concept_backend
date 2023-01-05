const express = require('express');
const { getAllStudent, createStudent } = require('../controllers/studentContoller');

const router = express.Router();
router.route('/student').get(getAllStudent);
router.route('/student/new').post(createStudent)
module.exports = router