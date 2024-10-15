const express = require('express');
const ctrl = require('../controllers/contactsControllers');

const contactsRouter = express.Router();

contactsRouter.get('/', ctrl.getAllContacts);
contactsRouter.get('/:id', ctrl.getContactById);
contactsRouter.post('/', ctrl.createContact);
contactsRouter.put('/:id', ctrl.updateContact);
contactsRouter.delete('/:id', ctrl.deleteContact);

module.exports = contactsRouter;