const multer = require("multer")
const path=require("path")


//Storage to store the file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

//Filter to make sure only pdf format is allowed

const fileFilter=(req,file,cb)=>{
    if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("Only PDF files are allowed!"), false);
      }
}


const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  });
  
  module.exports= upload;