const express = require("express");
const router=express.Router();
const {
  getAllContacts,
  postContacts,
  getContactById,
  updateContacts,
  deleteContacts,
} = require("../Controllers/contactController");
const validateToken=require('../middleware/validateToken')


router.use(validateToken)
router.route('/contacts').get(getAllContacts).post(postContacts);
router.route('/contacts/:id').get(validateToken,getContactById).put(updateContacts).delete(deleteContacts)

module.exports=router;

