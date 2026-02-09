const express=require('express')
const router=express.Router();
const {
    getUsers,
    registerUser,
    postLogin,
    currentUser  
}=require('../Controllers/userController')
const validateToken=require('../middleware/validateToken')



router.route('/').get(getUsers)
router.route('/registerUser').post(registerUser)
router.route('/login').post(postLogin)
router.route('/current').get(validateToken,currentUser)


module.exports=router;
