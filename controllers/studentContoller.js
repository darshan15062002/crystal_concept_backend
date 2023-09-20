const student = require('../model/studentModal')
const ErrorHander = require('../utils/errorhandler')
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require('../utils/apiFeatures');

// create student 
exports.createStudent = catchAsyncError(async (req, res, next) => {
    const product = await student.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
});


exports.getAllStudent = catchAsyncError(async (req, res) => {
    const apifeature = new ApiFeatures(student.find(), req.query).search().searchByName()
    const product = await apifeature.query;
    res.status(200).json({
        success: true,
        product
    })
})

exports.updateStudent = catchAsyncError(async (req, res, next) => {
    let product = await student.findById(req.params.id)


    if (!product) {
        return next(new ErrorHander('student not found', 404))
        //    return res.status(500).json({ success: false, message: "student not found" })
    }

    product = await student.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false, runValidators: true })

    res.status(200).json({
        success: true,
        product
    })
}
)
exports.deleteStudent = catchAsyncError(async (req, res, next) => {
    let product = await student.findById(req.params.id)
    if (!product) {
        return next(new ErrorHander('student not found', 404))

    }
    await product.remove();

    res.status(200).json({ success: true, message: 'student deleted succesfully' })

})
// get single student
exports.getSingleStudent = catchAsyncError(async (req, res, next) => {
    let product = await student.findById(req.params.id)
    if (!product) {
        return next(new ErrorHander('student not found', 404))

    }
    res.status(200).json({ success: true, product })
})


