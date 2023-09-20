
class ErrorHander extends Error {
    constructor(message, statusCode) {
        super(message), //is use to pass to sperprial level class loke Error
            this.statusCode = statusCode,
            Error.captureStackTrace(this, this.constructor)
    }

}
module.exports = ErrorHander