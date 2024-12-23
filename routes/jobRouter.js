const express = require("express");
const router=express.Router();
const {
  postJob,
  getEmployerJobs,
  getAlljobs
} = require("../Controllers/jobController");
const validateToken=require('../middleware/validateToken')


router.route('/getAllJobs').get(getAlljobs)
router.route('/postJob').post(validateToken,postJob)
router.route('/getJobs').get(validateToken,getEmployerJobs)




module.exports=router;

