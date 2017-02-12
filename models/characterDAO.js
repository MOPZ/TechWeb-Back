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
            + 'and acos ( '
            + 'sin((characters.position[0]) * (select pi()) / 180) '
            + '*sin(( (select characters.position[0] from characters where id = $(charID)) * (select pi()) / 180)) '
            + '+ cos((characters.position[0]) * (select pi()) / 180)'
            + '*cos(( (select characters.position[0] from characters where id = $(charID)) * (select pi()) / 180))'
            + '*cos(( (select characters.position[1] from characters where id = $(charID)) * (select pi()) / 180)-(characters.position[1]) * (select pi()) / 180)'
            + ')'
            + '* $(zoneRadius) < $(allyRadius) ORDER BY acos ( '
            + 'sin((characters.position[0]) * (select pi()) / 180) '
            + '*sin(( (select characters.position[0] from characters where id = $(charID)) * (select pi()) / 180)) '
            + '+ cos((characters.position[0]) * (select pi()) / 180)'
            + '*cos(( (select characters.position[0] from characters where id = $(charID)) * (select pi()) / 180))'
            + '*cos(( (select characters.position[1] from characters where id = $(charID)) * (select pi()) / 180)-(characters.position[1]) * (select pi()) / 180)'
            + ')',
            {
                charID : id,
                allyRadius: radius/1000,
                zoneRadius : 6371 //earth's radius
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
            + 'and acos ( '
            + 'sin((characters.position[0]) * (select pi()) / 180) '
            + '*sin(( (select characters.position[0] from characters where id = $(charID)) * (select pi()) / 180)) '
            + '+ cos((characters.position[0]) * (select pi()) / 180)'
            + '*cos(( (select characters.position[0] from characters where id = $(charID)) * (select pi()) / 180))'
            + '*cos(( (select characters.position[1] from characters where id = $(charID)) * (select pi()) / 180)-(characters.position[1]) * (select pi()) / 180)'
            + ')'
            + '* $(zoneRadius) < $(enemyRadius) ORDER BY acos ( '
            + 'sin((characters.position[0]) * (select pi()) / 180) '
            + '*sin(( (select characters.position[0] from characters where id = $(charID)) * (select pi()) / 180)) '
            + '+ cos((characters.position[0]) * (select pi()) / 180)'
            + '*cos(( (select characters.position[0] from characters where id = $(charID)) * (select pi()) / 180))'
            + '*cos(( (select characters.position[1] from characters where id = $(charID)) * (select pi()) / 180)-(characters.position[1]) * (select pi()) / 180)'
            + ')',
            {
                charID : id,
                enemyRadius: radius/1000,
                zoneRadius : 6371 //earth's radius
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

