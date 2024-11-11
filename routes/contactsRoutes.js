const express = require('express');
const ctrl = require('../controllers/contactsControllers');

const contactsRoutes = express.Router();

contactsRoutes.get('/', ctrl.getAllContacts);

contactsRoutes.get('/:contactId', ctrl.getContactById);

contactsRoutes.post('/', ctrl.createContact);

// contactsRoutes.put('/:id', ctrl.updateContact);

contactsRoutes.delete('/:contactId', ctrl.deleteContact);

module.exports = contactsRoutes;