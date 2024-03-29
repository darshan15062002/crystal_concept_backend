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
            $unwind: "$feesPaid"
        },
        {
            $match: {
                $expr: {
                    $and: [
                        // Transactions falling within the current academic year (June to May)
                        {
                            $or: [
                                {
                                    $and: [
                                        { $eq: [{ $year: "$feesPaid.date" }, { $year: { $subtract: [new Date(), { $multiply: [86400000, 365] }] } }] }, // Same year as current or previous
                                        { $gte: [{ $month: "$feesPaid.date" }, 6] }, // June or later
                                        { $lte: [{ $month: "$feesPaid.date" }, 5] } // May or earlier
                                    ]
                                },
                                {
                                    $and: [
                                        { $eq: [{ $year: "$feesPaid.date" }, { $add: [{ $year: { $subtract: [new Date(), { $multiply: [86400000, 365] }] } }, 1] }] }, // Next year
                                        { $lte: [{ $month: "$feesPaid.date" }, 5] } // May or earlier
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$feesPaid.amount" }
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