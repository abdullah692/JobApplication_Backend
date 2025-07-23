const catchAsyncErrors = require('../middleware/catchAsyncnErrors')
const { ErrorHandler } = require('../middleware/Error')
const Job = require('../modals/jobModal')


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
  console.log("req.user._id", req.user.id);

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


const getAlljobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ expired: false })
  res.status(200).json({
    success: true,
    message: "All Jobs fetched successfully!!",
    jobs
  })
})

const getEmployerJobs = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role == "Job Seeker") {
    new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
  }
  const jobPostedBy = await Job.find({ postedBy: req.user.id })
  if (!jobPostedBy) {
    return next(new ErrorHandler("Sorry! No jobs were posted by you"), 400)
  }
  res.status(200).json({
    success: true,
    message: "Jobs fetched successfully!",
    jobPostedBy
  })
})

const getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job not found.", 404));
  }
  res.status(200).json({
    success: true,
    job,
  });
});


const updateJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role == "Job Seeker") {
    new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
  }
  const { id } = req.params;

  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job not found"), 404)
  }

  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  console.log(req.body, " req.body");

  res.status(200).json({
    success: true,
    message: "Job updated successfully!!",
    job
  })
})


const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role == "Job Seeker") {
    new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
  }
  const { id } = req.params;

  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job not found"), 404)
  }

  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job deleted!!",
    job
  })
})

module.exports = {
  postJob,
  getEmployerJobs,
  getAlljobs,
  getSingleJob,
  updateJob,
  deleteJob
}