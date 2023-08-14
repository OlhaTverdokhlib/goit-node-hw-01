const contacts = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();

const invokeAction = async ({ action, contactId, name, email, phone }) => {
  switch (action) {
    case "list":
      const list = await contacts.listContacts();
      return console.table(list);

    case "get":
      const contact = await contacts.getContactById(contactId);
      return console.log(contact);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);

    case "remove":
      const contactDel = await contacts.removeContact(contactId);
      return console.log(contactDel);
  }
};

program
  .option("-a, --action <type>", "Action to invoke")
  .option("-i, --contactId <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

console.log(process.argv);
program.parse(process.argv);

const argv = program.opts();
console.log(argv);

invokeAction(argv);
