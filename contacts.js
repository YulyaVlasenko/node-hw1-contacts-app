const { writeFile, readFile } = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');

const listContacts = async () => {
    try {
   const data = await readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
      return error;
    }
}

listContacts(contactsPath)

const getContactById = async (contactId) => {
    try {
   const data = await readFile(contactsPath);
        const contacts = JSON.parse(data);
        const contact = contacts.find(contact => contact.id === contactId)
         if (contact) {
             return contact;
        } else {
            return null;
        }
      
    } catch (error) {
      return error;
    }
}

getContactById('jk')


const removeContact = async (contactId) => {
  try {
    const data = JSON.parse(await readFile(contactsPath));
    const contactToRemove = data.find((contact) => contact.id === contactId);

    if (contactToRemove) {
      const updatedContacts = data.filter((contact) => contact.id !== contactId);
      await writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
      return contactToRemove;
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};

removeContact("drsAJ4SHPYqZeG-83QTVW");


const addContact = async(name, email, phone) => { 
     if (!name || !email || !phone) {
        return null;
    }
    try {
        const data = await readFile(contactsPath);
        const contacts = JSON.parse(data);
        const contact = {
            id: nanoid(),
            name: `${name}`,
            email: `${email}`,
            phone: `${phone}`
        }
        contacts.push(contact);
        await writeFile('db/contacts.json', JSON.stringify(contacts, null, 2));
        return contact;
        
    } catch (error) {
      return error;
    }
}

addContact()

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}