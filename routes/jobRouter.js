const express = require("express");
const router=express.Router();
const {
  postJob,
  getEmployerJobs,
  getAlljobs,
  getSingleJob,
  updateJob,
  deleteJob
} = require("../Controllers/jobController");
const validateToken=require('../middleware/validateToken')


router.route('/getAllJobs').get(getAlljobs)
router.route('/postJob').post(validateToken,postJob)
router.route('/getJobs').get(validateToken,getEmployerJobs)
router.route('/getJob/:id').get(validateToken,getSingleJob)
router.route('/updateJob/:id').patch(validateToken,updateJob)
router.route('/deleteJob/:id').delete(validateToken,deleteJob)





module.exports=router;

