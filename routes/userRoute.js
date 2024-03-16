const express = require('express');
const { createUser, loginUser, updateProfile, getMyProfile, logoutUser, getAllUser, forgetPasswordMobile, resetpasswordMobile, getAllStudents, getStudentProfile, deleteUser, updateProfileByAdmin, } = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth.js');

const router = express.Router();

router.post('/user/new', createUser)

router.post('/user/login', loginUser)

router.get('/user/me', isAuthenticated, getMyProfile)

router.put('/user/updateprofile', isAuthenticated, updateProfile)
router.put('/user/updateprofile/:id', isAuthenticated, isAdmin, updateProfileByAdmin)

router.get("/user/logout", isAuthenticated, logoutUser);

router.get('/user/all', isAuthenticated, isAdmin, getAllUser)
router.get('/student/all', isAuthenticated, isAdmin, getAllStudents)
router.get('/student/single/:id', isAuthenticated, isAdmin, getStudentProfile)
router.delete('/student/single/:id', isAuthenticated, isAdmin, deleteUser)
router.route("/user/forgetpassword").post(forgetPasswordMobile).put(resetpasswordMobile);

module.exports = router