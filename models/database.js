var pgp = require('pg-promise') ();

var config = {
	host: 'localhost',
	port: 5432,
	database: 'Efrei',
	user: 'efrei',
	password: 'password'
};;

const DB = pgp(config);

module.exports = DB;