const DB = require('../models/database');


module.exports = {
    getAll(){
        return DB.query('SELECT * from users')
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    },
    getById(id){
        return DB.query(
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
        if(!email === undefined)
        {
            q_email = email;
        }
        if(!allianceID === undefined)
        {
            q_allianceID = allianceID
        }
        return DB.query(
            'INSERT INTO users(name, email, alliance_id) VALUES($(userName), $(mail), $(allianceid)) RETURNING *',
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
    }
};