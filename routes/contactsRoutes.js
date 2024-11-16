const express = require("express");
const ctrl = require("../controllers/contactsControllers");
const { authenticate, isValidId } = require("../middleware");

const contactsRoutes = express.Router();

contactsRoutes.get("/", authenticate, ctrl.getAllContacts);

contactsRoutes.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

contactsRoutes.post("/", authenticate, ctrl.createContact);

// contactsRoutes.put('/:id', ctrl.updateContact);

contactsRoutes.delete("/:contactId", authenticate, isValidId, ctrl.deleteContact);

module.exports = contactsRoutes;
