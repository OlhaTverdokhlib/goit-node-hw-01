const fs = require("node:fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");
const { read } = require("node:fs");
const { constants } = require("node:buffer");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
};

const write = (data) => {
  return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  return data.find((contact) => contact.id === contactId) || null;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const newContacts = [...contacts, newContact];
  await write(newContacts);
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const contactRemove = contacts[index];
  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];
  // console.log(newContacts);
  await write(newContacts);

  return contactRemove;
};
module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
