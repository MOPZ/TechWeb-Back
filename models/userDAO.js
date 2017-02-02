const DB = require('../models/database');

module.exports = {
	getById(id) {
		return DB.query(
			'SELECT * FROM users WHERE id = $(userID)',
			{ userID: id }
		).then((result) => {
				if (result.length === 0) {
					throw 'USER_NOT_FOUND';
				}
				return result [ 0 ]
			});
	},
	getAll() {
	return DB.query('SELECT * FROM users')
		.then((result) => {
			return result;
		})
		.catch((error) => {
			throw error;
		});
	},

	
};