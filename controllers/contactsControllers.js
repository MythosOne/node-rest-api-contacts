const getAllContacts = (req, res, next) => {
  // Database query to fetch all contacts
  console.log("List contacts...");
  res.send("List contacts...");
};

const getContactById = (req, res, next) => {
  // Database query to fetch contact by ID
  console.log("Get contact by ID...");
  res.send("Get contact...");
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
