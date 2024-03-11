const catchAsyncError = require("../middleware/catchAsyncError");
const StudentInfo = require("../model/studentInfoModal");
const User = require("../model/userModal");
const ErrorHander = require("../utils/errorhandler");



exports.createStudentInfo = catchAsyncError(async (req, res, next) => {
    const { id, feesPaid } = req.body;

    // Check if studentId exists
    const existingStudent = await User.findById(id);
    if (!existingStudent) {
        return next(new ErrorHander("Student not found", 404));
    }

    try {
       
        let studentInfo = await StudentInfo.findOne({ student: id });

        if (!studentInfo) {
          
            await StudentInfo.create({
                student: id,
                feesPaid: [feesPaid] 
            });
        } else {
          
            studentInfo.feesPaid.push(feesPaid);
            await studentInfo.save();
        }

        res.status(201).json({
            success: true,
            message: "Transaction added successfully"
        });
    } catch (error) {
        console.error(error);
        next(new ErrorHander("Server Error", 500));
    }
});

exports.getStudentInfo = catchAsyncError(async (req, res, next) => {
    const studentId = req.params.id;

    try {
       
        const studentInfo = await StudentInfo.findOne({ student: studentId });

        if (!studentInfo) {
            return res.status(404).json({success:false, message: "Student info not found" });
        }
        res.status(201).json({
            success: true,
            studentInfo
        });
    } catch (error) {
        console.error(error);
        next(new ErrorHander("Server Error", 500));
    }
});

module.exports = exports;
