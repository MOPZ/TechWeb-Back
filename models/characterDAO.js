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
    },
    createById(id, character){
        return DB.query(
            'INSERT INTO characters(name, user_id, class, position) VALUES($(charName), $(user_id), $(class), $(position)) RETURNING *',
            {
                charName: character.name,
                user_id: character.id,
                class: character.class,
                position: character.position
            }
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
            )
    }
};