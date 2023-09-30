const ErrorHander = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const User = require("../model/userModal");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { crystal } = req.cookies;



    if (!crystal) return next(new ErrorHander("Not logged in", 401))

    const decodedData = jwt.verify(crystal, process.env.JWT_SECRET)

    req.user = await User.findById(decodedData._id);

    next()
})