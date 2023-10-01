const catchAsyncError = require("../middleware/catchAsyncError");

const sendToken = catchAsyncError(async (user, res, statusCode, message) => {

    const token = await user.generateToken()
    res.status(statusCode).cookie('crystal', token, {
        ...cookieOptions, expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
    }).json({
        success: true,
        status: statusCode,
        token,
        message: message,
    })
},)

const cookieOptions = {
    secure: process.env.NODE_ENV === 'development' ? false : true,
    httpOnly: process.env.NODE_ENV === 'development' ? false : true,
    sameSite: process.env.NODE_ENV === 'development' ? false : "none",
}

module.exports = { sendToken, cookieOptions }