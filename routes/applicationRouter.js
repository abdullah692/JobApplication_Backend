const express = require("express");
const router=express.Router();
const {
  postApplication,
  getEmployeerAllApplications,
  getApplicantAllApplications,
  jobSeekerDeleteApplication,
  getSummary
} = require("../Controllers/applicationController");
const validateToken=require('../middleware/validateToken')
const upload=require("../middleware/multer")


// router.route('/current').get(validateToken,currentUser)
router.route('/application').post(upload.single("resume"),validateToken, postApplication);
router.route('/employer/getall').get(validateToken,getEmployeerAllApplications)
router.route('/applicant/getall').get(validateToken,getApplicantAllApplications)
router.route('/deleteJobSeeker/:id').delete(validateToken,jobSeekerDeleteApplication)
router.route('/getSummary').get(getSummary)



// router.post('/application', upload.single("resume"), (req, res, next) => {
//   // Log the uploaded file details
//   console.log("File received:", req.file);

//   // Log the rest of the form-data fields
//   console.log("Request body:", req.body);

//   // Handle the case where no file is uploaded
//   if (!req.file) {
//       return res.status(400).json({ success: false, message: "Resume file is required!" });
//   }

//   // Return success if file is uploaded
//   res.status(200).json({ success: true, file: req.file });
// });

module.exports=router;

