const DB = require('../models/database');


module.exports = {
    getAll(){
        return DB.accessor.query('SELECT * from users')
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    },
    getById(id){
        return DB.accessor.query(
            'SELECT * FROM users WHERE id = ${userID}',
            { userID: id }
        )
            .then((result) => {
                return result[0];
            })
            .catch((error) => {
                throw error;
            })
    },
    create(username, email, allianceID){
        return DB.accessor.query(
            'INSERT INTO users(name, email, alliance_id) '
            + 'SELECT $(userName), $(mail), $(allianceid) RETURNING *',
            //+ 'FROM (values(1)) as TMP '
            //+ 'WHERE NOT EXISTS (SELECT name FROM users where name = $(userName)) RETURNING *',
            {
                userName: username,
                mail: email,
                allianceid: allianceID
            }
        )
        .then ((result) => {
            return result[0];
        })
        .catch((error) => {
            throw error;
        })
    },
    deleteUserById(id){
        return DB.accessor.query(
            'DELETE FROM users WHERE id = $(userID) RETURNING *',
            {
                userID: id
            }
        )
            .then((result) => {
                return result[0];
            })
            .catch((error) => {
                throw error;
            })
        
    },
    editUserById(id, name, email, allianceID)
    {
        return DB.accessor.query(
            'UPDATE users '
            +'SET name = $(newUserName), email = $(newMail), alliance_id = $(newAllianceID) '
            +'WHERE id = $(userID) RETURNING *',
            {
                newUserName: name,
                newMail: email,
                newAllianceID: allianceID,
                userID : id
            }
        )
            .then((result) => {
                return result[0];
            })
            .catch((error) => {
                throw error;
            })
    },
    getUserCharactersById(id)
    {
        return DB.accessor.query(
            'SELECT * from characters WHERE user_id = $(userID)',
            {
                userID : id
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