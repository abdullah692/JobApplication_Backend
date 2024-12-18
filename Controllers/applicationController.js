const catchAsyncErrors = require("../middleware/catchAsyncnErrors")
const { ErrorHandler } = require("../middleware/Error");
const Application = require("../modals/applicationModal")

const postApplication = catchAsyncErrors(async (req, res, next) => {

})

module.exports = {
    postApplication
};
