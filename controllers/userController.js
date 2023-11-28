const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../model/userModal");
const { sendToken, cookieOptions } = require("../utils/feature.js");
const ErrorHander = require("../utils/errorhandler");




exports.createUser = catchAsyncError(async (req, res, next) => {

    // {
    //     "name":"darshan",
    //     "email":"darshan@gmail.com",
    //     "password":"$$dar$$120"
    // }
    const { name, phone, password } = req.body

    const response = await User.findOne({ phone })

    if (response) return next(new ErrorHander("User already exists", 400));
    const res = await User.findOne({ name })
    if (res) return next(new ErrorHander("User name already taken  ", 400));

    const user = await User.create({ name, phone, password })

    sendToken(user, res, 201, "Registered Successfully");
})


exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password")

    if (!res) return next(new ErrorHander("user not found", 404));

    if (!password) return next(ErrorHander("please enter password", 400))

    const isMatch = await user.comparePassword(password)

    if (!isMatch) return next(new ErrorHander("please enter correct password", 400))
    sendToken(user, res, 200, `Welcome Back, ${user.name}`);
})

exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie('crystal', "", { ...cookieOptions, expires: new Date(Date.now()) }).json({
        success: true,
        message: 'logout successful'
    })
})

exports.getMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user,
    });
});

exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const { name, email } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
    });

})
