
const ErrorHander = require('../utils/errorhandler')
const catchAsyncError = require("../middleware/catchAsyncError");

const Student = require('../model/studentModal');

// create student 
exports.createStudent = catchAsyncError(async (req, res, next) => {
    const { name, phone, std, location, joindate, role, password } = req.body

    const response = await Student.findOne({ phone: phone })
    if (response) {
        return res.status(400).json({ success: false, message: 'Student with the same phone number already exists.' });
    }
    const student = await Student.create(req.body)
    res.status(201).json({
        success: true,
        message: 'student Added successfully'
    })
});


exports.getAllStudent = catchAsyncError(async (req, res) => {
    // const apifeature = new ApiFeatures(student.find(), req.query).search().searchByName()
    // const product = await apifeature.query;
    const students = await Student.find()
    res.status(200).json({
        success: true,
        students
    })
})

exports.updateStudent = catchAsyncError(async (req, res, next) => {
    let student = await Student.findById(req.params.id)


    if (!student) {
        return next(new ErrorHander('student not found', 404))
        //    return res.status(500).json({ success: false, message: "student not found" })
    }

    student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false, runValidators: true })

    res.status(200).json({
        success: true,
        student
    })
}
)
exports.deleteStudent = catchAsyncError(async (req, res, next) => {
    let student = await Student.findById(req.params.id)
    if (!student) {
        return next(new ErrorHander('student not found', 404))

    }
    await student.remove();

    res.status(200).json({ success: true, message: 'student deleted succesfully' })

})
// get single student
exports.getSingleStudent = catchAsyncError(async (req, res, next) => {
    let student = await Student.findById(req.params.id)
    if (!student) {
        return next(new ErrorHander('student not found', 404))

    }
    res.status(200).json({ success: true, student })
})


