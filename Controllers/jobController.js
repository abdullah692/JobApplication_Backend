const catchAsyncErrors=require('../middleware/catchAsyncnErrors')
const {ErrorHandler}=require('../middleware/Error')
const Job=require('../modals/jobModal')

const postJob = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }
    const {
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
    } = req.body;
  
    if (!title || !description || !category || !country || !city || !location) {
      return next(new ErrorHandler("Please provide full job details.", 400));
    }
  
    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
      return next(
        new ErrorHandler(
          "Please either provide fixed salary or ranged salary.",
          400
        )
      );
    }
  
    if (salaryFrom && salaryTo && fixedSalary) {
      return next(
        new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400)
      );
    }
    console.log("req.user._id",req.user.id);
    
    const postedBy = req.user.id;
    const job = await Job.create({
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
      postedBy,
    });
    res.status(200).json({
      success: true,
      message: "Job Posted Successfully!",
      job,
    });
  });
  
module.exports={
    postJob
}