const catchAsyncErrors = require("../middleware/catchAsyncnErrors")
const { ErrorHandler } = require("../middleware/Error");
const Application = require("../modals/applicationModal")
const Job=require("../modals/jobModal")

const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role == "Employer") {
    return next(new ErrorHandler("Employeer is not allowed to access"), 400)
  }
  console.log("req.file;", req.file);
  console.log("Body:", req.body);
  if (!req.file || Object.keys(req.file).length == 0) {
    return next(new ErrorHandler("Resume File is required !!"), 400)
  }
  const { path: path, filename: filename } = req.file;
  const { name, email, coverLetter, phone, address, jobId } = req.body;
console.log("jobid",req.body);

  if (!jobId) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  const jobDetails = await Job.findById(jobId);
  console.log("JobDetauk",jobDetails);
  
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  const applicantID = {
    user: req.user.id,
    role: "Job Seeker",
  };
  const employerID = {
    user: jobDetails.postedBy.toString(),
    role: "Employer",
  };
  console.log("applicantID",applicantID);
  console.log("employerID",employerID);
  

  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !applicantID ||
    !employerID
  ) {
    // Delete uploaded file if validation fails
    // fs.unlinkSync(resumePath);
    return next(new ErrorHandler("Please fill all fields.", 400));
  }

  const application = await Application.create({
    name,
    email,
    jobId,
    coverLetter,
    phone,
    address,
    applicantID,
    employerID,
    resume: {
      path,
      filename
    },
    
  });

  res.status(200).json({
    success: true,
    message: "Application is submitted!!",
    application

  })
})


const getEmployeerAllApplications = catchAsyncErrors(async (req, res, next) => {
  console.log("req.body", req.user);

  const { role } = req.user;
  if (role == "Job Seeker") {
    return next(new ErrorHandler("Job Seeker not allowed to access this request"), 400)
  }
  const { id } = req.user;
  const applications = await Application.find({ "employerID.user": id });
  console.log("applications",applications);
  
  res.status(200).json({
    success: true,
    applications,
  });
})



const getApplicantAllApplications = catchAsyncErrors(async (req, res, next) => {
  console.log("req.body", req.user);

  const { role } = req.user;
  if (role == "Employer") {
    return next(new ErrorHandler("Employer not allowed to access this request"), 400)
  }
  const { id } = req.user;
  const applications = await Application.find({ "applicantID.user": id });
  console.log("applications",applications);
  
  res.status(200).json({
    success: true,
    applications,
  });
})


const jobSeekerDeleteApplication=catchAsyncErrors(async(req,res,next)=>{
  const {role}=req.user;
  if(role == "Employer")
  {
    return next(new ErrorHandler("Employer not allowed to access this request"), 400)
  }
  console.log("req.param",req.params);
  const {id}=req.params;
  console.log("iddsss",id);
  const application=await Application.findById(id);
  console.log(application,"applicationfind");
  if(!application)
  {
    return next(new ErrorHandler("Application not found!!"),400);
  }
  await application.deleteOne();
  res.status(200).json({
    success:true,
    message:"Application successfully deleted!!"
  });
  
})




module.exports = {
  postApplication,
  getEmployeerAllApplications,
  getApplicantAllApplications,
  jobSeekerDeleteApplication
};
