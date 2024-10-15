const contacts = require("../db/contacts");

const getAllContacts = async (req, res, next) => {
  // Database query to fetch all contacts
  const result = await contacts.listContacts();

  res.json(result);
};

const getContactById = async (req, res, next) => {
  // Database query to fetch contact by ID
  const result = await contacts.getById(req.params.contactId);

  if (!result) {
    return res.status(404).json({ message: "Contact not found" });
  }

  res.json(result);
};

const createContact = (req, res, next) => {
  // Database query to create contact
  console.log("Create contact...");
  res.send("Create contact...");
};

const updateContact = (req, res, next) => {
  // Database query to update contact
  console.log("Update contact...");
  res.send("Update contact...");
};

const deleteContact = (req, res, next) => {
  // Database query to delete contact
  console.log("Delete contact...");
  res.send("Delete contact...");
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
