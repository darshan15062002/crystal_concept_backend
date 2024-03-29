const catchAsyncError = require("../middleware/catchAsyncError");
const StudentInfo = require("../model/studentInfoModal");
const User = require("../model/userModal");
const ErrorHander = require("../utils/errorhandler");



exports.createStudentInfo = catchAsyncError(async (req, res, next) => {
    const { id, feesPaid, exam, joindate, attendance } = req.body;
    console.log(attendance);
    // Check if studentId exists
    const existingStudent = await User.findById(id);
    if (!existingStudent) {
        return next(new ErrorHander("Student not found", 404));
    }

    try {

        let studentInfo = await StudentInfo.findOne({ student: id });

        if (!studentInfo) {
            studentInfo = await StudentInfo.create({
                student: id
            });
        }

        if (feesPaid) studentInfo.feesPaid.push(feesPaid);

        if (exam) studentInfo.exams.push(exam)
        if (joindate) studentInfo.joiningDate = joindate
        if (attendance) studentInfo.attendance.push(attendance)




        await studentInfo.save();


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
            return res.status(404).json({ success: false, message: "Student info not found" });
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

exports.deleteTransaction = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { tid } = req.query;

    try {
        const studentInfo = await StudentInfo.findOne({ student: id });

        if (!studentInfo) {
            return res.status(404).json({ success: false, message: "Student info not found" });
        }

        // Filter out the transaction to be deleted
        studentInfo.feesPaid = studentInfo.feesPaid.filter(item => item._id.toString() !== tid);

        // Save the updated student info
        await studentInfo.save();

        // Respond with success message
        res.status(200).json({
            success: true,
            message: 'Transaction deleted successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});

