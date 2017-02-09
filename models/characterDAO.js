const DB = require('../models/database');

module.exports = {
    getAll(){
        return DB.accessor.query('SELECT * from characters')
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    }, 
    getById(id){
        return DB.accessor.query(
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
        console.log(position);
        return DB.accessor.query(
            'INSERT INTO characters(name, user_id, class, position)'
            + 'SELECT $(charName), $(userID), $(classChar), $(charPosition) '
            + 'FROM (values(1)) as TMP WHERE NOT EXISTS (SELECT name from characters WHERE name = $(charName)) RETURNING *',
            {
                charName : name,
                classChar : char_class,
                userID : user_id,
                charPosition: '(' + position.x + ',' + position.y + ')'
            }
        )
        .then((result)=>{
            return result;
        })
        .catch((error) =>{
            throw error;
        })
    },
    deleteCharacterById(id){
        return DB.accessor.query(
            'DELETE FROM characters WHERE id = '+ id + ' RETURNING *'
        )
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    },
    editCharacterById(id, name, char_class, user_id, position){
        return DB.accessor.query(
            'UPDATE characters '
            + 'SET name = $(charName), '
            + 'class = $(classChar), '
            + 'user_id = $(userID), '
            + 'position = $(charPosition) '
            + 'WHERE NOT EXISTS (SELECT name FROM characters WHERE name = $(charName)) AND id = $(charID) RETURNING *',
            {
                charID: id,
                charName : name,
                classChar : char_class,
                userID: user_id,
                charPosition: position
            }
        )
        .then((result)=>{
            return result;
        })
        .catch((error) =>{
            throw error;
        })
    },
    getCharactersByClass(char_class){
        return DB.accessor.query(
            'SELECT * from characters WHERE class = $(classChar)',
            {
                classChar : char_class
            }
        )
        .then((result)=>{
            return result;
        })
        .catch((error) =>{
            throw error;
        })
    },
    getAlliesCharacterByRadius(){
        return DB.accessor.query(
            'SELECT characters.* from characters, users '
            +'WHERE characters.class = $(classname) AND users.alliance_id = $(allianceID) AND characters.user_id = users.id AND characters.id <> id',
            {
                allianceID : id,
                classname: className
            }
        )
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    }

};

