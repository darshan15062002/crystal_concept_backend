const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../model/userModal");
const StudentInfo = require("../model/studentInfoModal");
exports.getDashboard = catchAsyncError(async (req, res, next) => {
    const userCount = await User.countDocuments()
    const studentsCount = await User.countDocuments({ role: 'student' })
    const teachersCount = await User.countDocuments({ role: 'teacher' })
    const four = await User.countDocuments({ std: 4 })
    const five = await User.countDocuments({ std: 5 })
    const six = await User.countDocuments({ std: 6 })
    const seven = await User.countDocuments({ std: 7 })
    const eight = await User.countDocuments({ std: 8 })
    const nine = await User.countDocuments({ std: 9 })
    const ten = await User.countDocuments({ std: 10 })

    const totalSum = await StudentInfo.aggregate([
        {
            $unwind: "$feesPaid" // Unwind the feesPaid array
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$feesPaid.amount" } // Calculate the total amount paid across all students
            }
        }
    ]);

    console.log(totalSum);
    res.status(200).json({
        success: true,
        userCount,
        studentsCount,
        teachersCount,
        eachStdCount: [four, five, six, seven, eight, nine, ten],
        totalrevenue: totalSum[0].totalAmount
    })
})