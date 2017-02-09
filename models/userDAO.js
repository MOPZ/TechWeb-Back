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
                if(result.length ===0) {
                    throw 'USER NOT_FOUND';
                }
                return result [0];
            })
    },
    create(username, email, allianceID){
        var q_email = "null";
        var q_allianceID = null;
        if(!(email === undefined))
        {
            q_email = email;
        }
        if(!(allianceID === undefined))
        {
            q_allianceID = allianceID
        }
        return DB.accessor.query(
            'INSERT INTO users(name, email, alliance_id) '
            + 'SELECT $(userName), $(mail), $(allianceid) '
            + 'FROM (values(1)) as TMP '
            + 'WHERE NOT EXISTS (SELECT name FROM users where name = $(userName)) RETURNING *',
            {
                userName: username,
                mail: q_email,
                allianceid: q_allianceID
            }
        )
        .then ((result) => {
            return result;
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
                return result;
            })
            .catch((error) => {
                throw error;
            })
        
    },
    editUserById(id, name, email, allianceID)
    {
        var q_email = "null";
        var q_allianceID = null;
        if(!(email === undefined))
        {
            q_email = email;
        }
        if(!(allianceID === undefined))
        {
            q_allianceID = allianceID
        }
        return DB.accessor.query(
            'UPDATE users '
            +'SET name = $(newUserName), email = $(newMail), alliance_id = $(newAllianceID) '
            +'WHERE id = $(userID) RETURNING *',
            {
                newUserName: name,
                newMail: q_email,
                newAllianceID: q_allianceID,
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