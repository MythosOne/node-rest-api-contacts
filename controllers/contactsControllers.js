// const contacts = require("../db/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");
const { Contact, addSchema } = require("../model/contactsModel");

const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.find({ owner });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findById(contactId).populate({
    path: "owner",
    match: { _id: owner },
  });

  if (!result) {
    throw HttpError(404, "No contacts found");
  }

  res.status(200).json(result);
};

const deleteContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOneAndDelete({ _id: contactId, owner });

  if (!result) {
    throw HttpError(404, "No contacts found");
  }

  res.status(200).json({ _id: contactId, message: "Contact deleted" });
};

const createContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Missing required field");
  }

  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  createContact: ctrlWrapper(createContact),
  deleteContact: ctrlWrapper(deleteContact),
};
