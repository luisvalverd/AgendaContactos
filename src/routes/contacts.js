const db = require('./../database');

const createContact = (data, id) => {
	db.insertContacts(data.name, data.lastname, data.phone, id);
}

const deleteContact = (id) => {
	db.deleteContact(id);
}

module.exports = {
	createContact,
	deleteContact
}