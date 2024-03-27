const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = () => {
    const contacts = require('./db/contacts.json');
    console.table(contacts);
};

const getContactById = (contactId) => {
    const contacts = require('./db/contacts.json');
    const contact = contacts.find(contact => contact.id === contactId);
    console.table([contact]);
};

const removeContact = (contactId) => {
    const contacts = require('./db/contacts.json');
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Contact with ID ${contactId} has been removed.`);
    });
};

const addContact = (name, email, phone) => {
    const contacts = require('./db/contacts.json');
    const newContact = { id: Date.now(), name, email, phone };
    const updatedContacts = [...contacts, newContact];
    fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('New contact has been added.');
    });
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};
