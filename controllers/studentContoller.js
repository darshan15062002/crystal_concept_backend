const student = require('../model/studentModal')

// create student 
exports.createStudent = async (req, res, next) => {
    const product = student.create(req.body)
    res.status(201).json({
        sucess: true,
        product
    })
}


exports.getAllStudent = async (req, res) => {
    const product = await student.find();
    res.status(200).json({
        sucess: true,
        product
    })
} 