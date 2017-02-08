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
    createCharacter(name, char_class, user_id, position){
        return DB.query(
            'INSERT INTO characters(name, user_id, class, position)'
            + 'SELECT $(charName), $(userID), $(classChar), $(charPosition) '
            + 'FROM (values(1)) as TMP WHERE NOT EXISTS (SELECT name from characters WHERE name = $(charName)) RETURNING *',
            {
                charName : name,
                classChar : char_class,
                userID : user_id,
                charPosition: position
            }
        )
        .then((result)=>{
            return result;
        })
        .catch((error) =>{
            throw error;
        })
    }
};

