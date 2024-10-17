const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts_data.json");

async function readFile() {
  const data = await fs.readFile(contactsPath, "utf8");

  return JSON.parse(data);
}

async function writeFile(contacts) {
  const data = await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return data;
}

async function listContacts() {
  const listContacts = await readFile();

  return listContacts;
}

const getContactById = async (contactId) => {
  const contacts = await readFile();
  const contact = contacts.find((contact) => contact.id === contactId);

  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await readFile();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);

  await writeFile(contacts);

  return result;
};

const addContact = async (body) => {
  const contacts = await readFile();

  const newContact = { id: nanoid(10), ...body };

  contacts.push(newContact);

  await writeFile(contacts);

  return newContact;
};

// const updateContact = async (contactId, body) => {
//   const contacts = await readFile();
//   const index = contacts.findIndex((contact) => contact.id === contactId);

//   if (index === -1) {
//     return null;
//   }

//   contacts[index] = { ...contacts[index], ...body };

//   await writeFile(contacts);

//   return contacts[index];
// };

module.exports = {
  listContacts,
  getContactById,
  addContact,
  // updateContact,
  removeContact,
};
