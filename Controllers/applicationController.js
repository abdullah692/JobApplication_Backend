const catchAsyncErrors = require("../middleware/catchAsyncnErrors")
const { ErrorHandler } = require("../middleware/Error");
const Application = require("../modals/applicationModal")

const postApplication = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.body;
    if (role == "Employeer") {
        return next(new ErrorHandler("Employeer is not allowed to access"), 400)
      }
      console.log("req.file;",req.file);
      console.log("Body:", req.body);
    if (!req.file || Object.keys(req.file).length == 0) {
        return next(new ErrorHandler("Resume File is required !!"), 400)
    }

    
    const { path: path, filename: filename } = req.file;


    const { name, email, coverLetter, phone, address, jobId } = req.body;

    if (
        !name ||
        !email ||
        !coverLetter ||
        !phone ||
        !address 
        // !applicantID ||
        // !employerID
      ) {
        // Delete uploaded file if validation fails
        // fs.unlinkSync(resumePath);
        return next(new ErrorHandler("Please fill all fields.", 400));
      }

      const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
       resume:{
        path,
        filename

       }
      });
    
      res.status(200).json({
        success:true,
        message:"Application is submitted!!",
        application

      })
})

module.exports = {
    postApplication
};
