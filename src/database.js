const { Pool } = require('pg');
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'agendacontactos',
	password: 'mhgygjlop2',
	port: 5432,
});

const getUserByUsername = async (username) => {
	const data = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
	return data.rows[0];
}

const getUserById = async (id) => {
	const data = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
	return data.rows[0];
}

const getUserByEmail = async (email) => {
	const data = await pool.query('SELECT * FROM users WHERE email = $1',[email]);
	return data.rows[0];
}

const comprovatedCredentials = async (username, email) => {
	const data = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2',[username, email]);
	if (data.rows.length > 0){
		return true;
	}
	return false;
}

const insertUser = async (username, email, password) => {
	await pool.query('INSERT INTO users(username, email, password) VALUES ($1, $2, $3)', [username, email, password]);
	return await (await pool.query('SELECT * FROM users WHERE username = $1', [username])).rows[0];
} 

// contact 

const getContacts = async (id) => {
	const dataContacts = await pool.query('SELECT contactos_id, nombre, apellido, telefono FROM contactos WHERE user_id = $1', [id]);
	return dataContacts.rows;
}

const getContactById = async (id) => {
	const dataContact = await pool.query('SELECT contactos_id, nombre, apellido, telefono FROM contactos WHERE contactos_id = $1', [id]);
	return dataContact.rows[0];
}

const insertContacts = async (nombre, apellido, telefono, id) => {
	await pool.query('INSERT INTO contactos(nombre, apellido, telefono, user_id) VALUES ($1, $2, $3, $4)', [nombre, apellido, telefono, id]);
}

const deleteContact = async (id) => {
	await pool.query('DELETE FROM contactos WHERE contactos_id = $1', [id]);
}

const editContact = async (nombre, apellido, telefono, id) => {
	await pool.query('UPDATE contactos SET nombre = $1, apellido = $2, telefono = $3 WHERE contactos_id = $4', [nombre, apellido, telefono, id]);
}


module.exports= {
	getUserByUsername,
	insertUser,
	getUserById, 
	getUserByEmail,
	comprovatedCredentials,
	getContacts,
	getContactById,
	insertContacts,
	deleteContact,
	editContact
}
