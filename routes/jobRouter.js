const express = require("express");
const router=express.Router();
const {
  postJob
} = require("../Controllers/jobController");
const validateToken=require('../middleware/validateToken')


router.route('/postJob').post(validateToken,postJob)


module.exports=router;

