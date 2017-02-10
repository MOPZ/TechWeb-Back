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
                return result [0];
            })
    },
    createCharacter(name, char_class, user_id, position){
        return DB.accessor.query(
            'INSERT INTO characters(name, user_id, class, position)'
            + 'SELECT $(charName), $(userID), $(classChar), $(charPosition) '
            + 'RETURNING *',
            //+ 'FROM (values(1)) as TMP 
            //+ 'WHERE NOT EXISTS (SELECT name from characters WHERE name = $(charName)) RETURNING *',
            {
                charName : name,
                classChar : char_class,
                userID : user_id,
                charPosition: '(' + position.x + ',' + position.y + ')'
            }
        )
        .then((result)=>{
            return result[0];
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
                return result[0];
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
                charPosition: '(' + position.x + ',' + position.y + ')'
            }
        )
        .then((result)=>{
            return result[0];;
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
    getAlliesCharacterByRadius(id, radius){
        return DB.accessor.query(
            'select characters.* from characters, users '
            + 'where users.id = characters.user_id '
            + 'and users.alliance_id = (select users.alliance_id from users, characters '
            + 'where users.id = characters.user_id and characters.id = $(charID)) '
            + 'and characters.id <> $(charID) '
            + 'and ((select characters.position + $(allyRadius) as radius_positif from characters where characters.id = $(charID))[0] > characters.position[0] '
            + 'and (select characters.position + $(allyRadius) as radius_positif from characters where characters.id = $(charID))[1] > characters.position[1]) '
            + 'and ((select characters.position - $(allyRadius) as radius_negatif from characters where characters.id = $(charID))[0] < characters.position[0] '
            + 'and (select characters.position - $(allyRadius) as radius_negatif from characters where characters.id = $(charID))[1] < characters.position[1])',
            {
                charID : id,
                allyRadius: '('+radius+','+radius+')',
            }
        )
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    },
    getEnnemiesCharacterByRadius(id, radius){
        return DB.accessor.query(
            'select characters.* from characters, users '
            + 'where users.id = characters.user_id '
            + 'and users.alliance_id <> (select users.alliance_id from users, characters '
            + 'where users.id = characters.user_id and characters.id = $(charID)) '
            + 'and characters.id <> $(charID) '
            + 'and ((select characters.position + $(allyRadius) as radius_positif from characters where characters.id = $(charID))[0] > characters.position[0] '
            + 'and (select characters.position + $(allyRadius) as radius_positif from characters where characters.id = $(charID))[1] > characters.position[1]) '
            + 'and ((select characters.position - $(allyRadius) as radius_negatif from characters where characters.id = $(charID))[0] < characters.position[0] '
            + 'and (select characters.position - $(allyRadius) as radius_negatif from characters where characters.id = $(charID))[1] < characters.position[1])',
            {
                charID : id,
                allyRadius: '('+radius+','+radius+')',
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

