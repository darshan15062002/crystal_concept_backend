const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../model/userModal");
const { sendToken, cookieOptions } = require("../utils/feature.js");
const ErrorHander = require("../utils/errorhandler");
const ApiFeatures = require("../utils/apiFeatures.js");

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const twilioPhoneNumber = process.env.TWILIO_NO;


const client = require('twilio')(accountSid, authToken);



exports.createUser = catchAsyncError(async (req, res, next) => {

    // {
    //     "name":"darshan",
    //     "email":"darshan@gmail.com",
    //     "password":"$$dar$$120"
    // }
    const { name, phone, std, location, password } = req.body

    const response = await User.findOne({
        $or: [
            { username: name },   // Replace yourInput with the actual username you are searching for
            { phone: phone },      // Replace yourInput with the actual phone number you are searching for
        ],
    })


    if (response) return next(new ErrorHander("User already exist  ", 400));

    const user = await User.create({ name, phone, std, location, password })
    sendToken(user, res, 201, "Registered Successfully");
})


exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({
        $or: [
            { name: email },   // Replace yourInput with the actual username you are searching for
            { phone: email },      // Replace yourInput with the actual phone number you are searching for
        ],
    }).select("+password");

    if (!user) return next(new ErrorHander("user not found", 404));

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
    const { name, phone, std, location, } = req.body;

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (std) user.std = std;
    if (location) user.location = location;


    await user.save();

    res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
    });

})

exports.getAllUser = catchAsyncError(async (req, res, next) => {
    const pagination = 10
    const userCount = await User.countDocuments()

    const apiFeatures = new ApiFeatures(User.find(), req.query).searchByName().searchByPhone().searchByStd().searchByCity().pagination(pagination)
    const users = await apiFeatures.query;
    res.status(200).json({
        success: true,
        userCount,
        users
    })

});

exports.forgetPasswordMobile = catchAsyncError(async (req, res, next) => {
    const { phone } = req.body

    const user = await User.findOne({ phone })

    if (!user) return next(new ErrorHander("Incorrect Mobile Number", 404));

    const otp = generateOTP()
    const otp_expire = 15 * 60 * 1000;

    user.otp = otp;

    user.otp_expire = new Date(Date.now() + otp_expire);

    await user.save();

    const message = `Your OTP for Resetting Password is ${otp}. Please ignore if you haven't requested this.`;
    try {
        console.log(user.phone);
        await sendSMS(user.phone, message);
    } catch (error) {
        user.otp = null;
        user.otp_expire = null;
        await user.save();
        return next(error);
    }

    res.status(200).json({
        success: true,
        message: `OTP Sent To ${user.phone}`,
    });
})


exports.resetpasswordMobile = catchAsyncError(async (req, res, next) => {
    const { otp, password } = req.body;

    const user = await User.findOne({
        otp,
        otp_expire: {
            $gt: Date.now(),
        },
    });

    if (!user)
        return next(new ErrorHander("Incorrect OTP or has been expired", 400));

    if (!password)
        return next(new ErrorHander("Please Enter New Password", 400));

    user.password = password;
    user.otp = undefined;
    user.otp_expire = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Password Changed Successfully, You can login now",
    });
});



function generateOTP() {
    // Generate a random 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000);
}
async function sendSMS(to, body) {
    try {
        await client.messages
            .create({
                body,
                from: twilioPhoneNumber,
                to: "+91" + to,
            });
    } catch (error) {
        console.log(error);
        throw new ErrorHander('Error sending SMS', 500);
    }
}








