const ContactsModal = require("../modals/jobModal");

//GET Request : All Contacts
const getAllContacts = async (req, res) => {
  const contacts = await ContactsModal.find({user_id:req.user.id});
  res.status(200).json({ message: "Contacts Data", contacts });
};

//GET Request: Specific User by Id
const getContactById = async (req, res) => {
  try {
    const contactById = await ContactsModal.findById(req.params.id);
    if (contactById) {
      res.status(200).json({ message: "Contact Found", contactById });
    } else {
      res.status(400).json({ message: "Contact Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internel Server Error", error });
  }
};

//POST Request:Post data
const postContacts = async (req, res) => {
  try {
    const { name, email, address, phone } = req.body;
    if (!name || !email || !address || !phone) {
      res.send(400).json({ message: "Please provide all data" });
    } else {
      const createContacts = await ContactsModal.create({
        name,
        email,
        address,
        phone,
        user_id: req.user.id,
        // user_id: 12,
      });
      if (createContacts) {
        res.status(200).json({ message: "Contact is successfully created" });
        console.log(createContacts, "post");
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internel server error", error });
  }
};

//Update Request
const updateContacts = async (req, res) => {
  const checkContacts = await ContactsModal.findById(req.params.id);
  console.log(checkContacts, "checkContacts");
  try {
    if (checkContacts) {
      const { name, email, address, phone } = req.body;
      if (!name || !email || !address || !phone) {
        return res.send(400).json({ message: "Please provide all data" });
      } else if (checkContacts.user_id.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "Don't have access to update the Contact Data",
        });
      } else {
        const updateContactData = await ContactsModal.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );
        if (updateContactData) {
          console.log(updateContactData, "updateContactData");
          return res
            .status(200)
            .json({ message: "Contact data is updated", updateContactData });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internel server error", error });
  }
};

//Delete Request
const deleteContacts = async (req, res) => {
  try {
    const checkContacts = await ContactsModal.findById(req.params.id);
    console.log(checkContacts, "CheckContactsaa");
    console.log(req.user.id, "reuserId");
    if (!checkContacts) {
      return res.status(403).json({
        success: false,
        message: "Contact not found",
      });
    } else if (checkContacts.user_id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Don't have access to delete the Contact Data",
      });
    } else {
      const deleteContact = await ContactsModal.deleteOne({
        _id: req.params.id,
      });
      res
        .status(200)
        .json({ message: "Contact is successfully deleted", deleteContact });
    }
  } catch (error) {
    res.status(500).json({ message: "Internel server error", error });
  }
};

module.exports = {
  getAllContacts,
  postContacts,
  getContactById,
  updateContacts,
  deleteContacts,
};
