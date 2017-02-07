const DB = require('../models/database');


module.exports = {
    getAll(){
        return DB.query('SELECT * FROM alliances')
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    },
    getById(id){
        return DB.query(
            'SELECT * FROM alliances WHERE id = ${allianceID}',
            { 
                allianceID: id
            }
        )
            .then((result) => {
                if(result.length === 0){
                    throw 'ALLIANCE NOT_FOUND';
                }
                return result[0];
            })
    },
    create(alliancename){
        return DB.query(
            'INSERT INTO alliances(name) VALUES($(allianceName)) RETURNING *',
            {
                allianceName: alliancename
            }
        )
        .then((result) => {
            return result;
        })
        .catch((error) => {
            throw error;
        })
    },
    deleteAllianceById(id){
        return DB.query(
            'DELETE FROM alliances WHERE id = ${allianceID}',
            {
                allianceID: id
            }
        )
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
        
    },
    editAllianceById(id, alliance){
        return DB.query(
            'UPDATE alliances SET name = ${newAllianceName} WHERE id = '+ id +' RETURNING *',
            {
                newAllianceName: alliance,
            }
        )
        .then((result) => {
                return {
                    "alliance" : result[0]
                };
            })
            .catch((error) => {
                throw error;
            })

    }
};