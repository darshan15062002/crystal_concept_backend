const express = require('express');
const { getAllStudent, createStudent, updateStudent, deleteStudent, getSingleStudent } = require('../controllers/studentContoller');

const router = express.Router();
router.route('/student').get(getAllStudent);
router.route('/student/new').post(createStudent);
router.route('/student/:id').put(updateStudent).delete(deleteStudent).get(getSingleStudent)

module.exports = router