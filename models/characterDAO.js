const DB = require('../models/database');

module.exports = {
    getAll(){
        return DB.query('SELECT * from characters')
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    },
    getById(id){
        return DB.query(
            'SELECT * FROM characters WHERE id = ${characterID}',
            { characterID : id }
        )
            .then((result) => {
                if(result.length ===0) {
                    throw 'CHARACTER NOT_FOUND';
                }
                return result [0];
            })
    }
};