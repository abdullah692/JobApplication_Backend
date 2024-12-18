const express = require("express");
const router=express.Router();
const {
  postApplication
} = require("../Controllers/applicationController");
const validateToken=require('../middleware/validateToken')
const upload=require("../middleware/multer")


// router.route('/current').get(validateToken,currentUser)
router.route('/application').post(upload.single("resume"), postApplication);

module.exports=router;

