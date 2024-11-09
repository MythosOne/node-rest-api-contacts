// const contacts = require("../db/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");
const { Contact, addSchema } = require("../model/contactsModel");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();

    if (!result.length) {
      return res.status(404).json({ message: "No contacts found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await Contact.findById(contactId);

    if (!result) {
      return res.status(404).json({ message: "No contacts found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await Contact.findOneAndDelete({ _id: contactId });

    if (!result) {
      return res.status(404).json({ message: "No contacts found" });
    }

    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Missing required field");
  }

  const result = await Contact.create(req.body);

  res.status(201).json(result);
};

// const updateContact = async (req, res, next) => {
//   // Database query to update contact
//   const { contactId } = req.params;

//   const result = await contacts.updateContact(contactId, req.body);

//   res.send(result);
// };

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  createContact: ctrlWrapper(createContact),
  // updateContact,
  deleteContact: ctrlWrapper(deleteContact),
};
