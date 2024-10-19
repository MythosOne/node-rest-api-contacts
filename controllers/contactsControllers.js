const contacts = require("../db/contacts");
const { addSchema } = require("../schema/contactsSchemas");

const getAllContacts = async (req, res, next) => {
  // Database query to fetch all contacts
  const result = await contacts.listContacts();

  res.status(200).json(result);
};

const getContactById = async (req, res, next) => {

  const { contactId } = req.params;
  // Database query to fetch contact by ID
  const result = await contacts.getById(contactId);

  if (!result) {
    return res.status(404).json({ message: "Contact not found" });
  }

  res.status(200).json(result);
};

const deleteContact = async (req, res, next) => {
  // Database query to delete contact
  const result = await contacts.removeContact(req.params.contactId);

  if (!result) {
    return res.status(404).json({ message: "Contact not found" });
  }

  res.status(200).json(result);
};

const createContact = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "Missing required field" });
  }
  console.log(req.body);
  // Database query to create contact
  const result = await contacts.addContact(req.body);

  res.status(201).json(result);
};

// const updateContact = async (req, res, next) => {
//   // Database query to update contact
//   const { contactId } = req.params;

//   const result = await contacts.updateContact(contactId, req.body);

//   res.send(result);
// };

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  // updateContact,
  deleteContact,
};
