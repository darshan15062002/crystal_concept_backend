const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../model/userModal");
const StudentInfo = require("../model/studentInfoModal");
exports.getDashboard = catchAsyncError(async (req, res, next) => {
    const userCount = await User.countDocuments()
    const studentsCount = await User.countDocuments({ role: 'student' })
    const teachersCount = await User.countDocuments({ role: 'teacher' })
    const eachStdCount = [];
    for (let i = 4; i <= 10; i++) {
        const stdCount = await User.countDocuments({ role: 'student', std: i });
        eachStdCount.push(stdCount);
    }

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
        eachStdCount: eachStdCount,
        totalrevenue: totalSum[0]?.totalAmount || 0
    })
})