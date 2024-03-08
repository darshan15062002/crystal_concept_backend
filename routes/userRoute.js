const express = require('express');
const { createUser, loginUser, updateProfile, getMyProfile, logoutUser, getAllUser, forgetPasswordMobile, resetpasswordMobile, getAllStudents, } = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/user/new', createUser)

router.post('/user/login', loginUser)

router.get('/user/me', isAuthenticated, getMyProfile)

router.put('/user/updateprofile', isAuthenticated, updateProfile)

router.get("/user/logout", isAuthenticated, logoutUser);

router.get('/user/all', isAuthenticated, isAdmin, getAllUser)
router.get('/student/all', isAuthenticated, isAdmin, getAllStudents)
router.route("/user/forgetpassword").post(forgetPasswordMobile).put(resetpasswordMobile);

module.exports = router