const DB = require('../models/database');


module.exports = {
    getAll(){
        return DB.accessor.query('SELECT * FROM alliances')
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    },
    getById(id){
        return DB.accessor.query(
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
        console.log(alliancename);
        return DB.accessor.query(
            'INSERT INTO alliances(name) '
            + 'SELECT $(allianceName) '
            + 'FROM (values(1)) as TMP '
            + 'WHERE NOT EXISTS (SELECT name from alliances WHERE name = $(allianceName)) RETURNING *',
            {
                "allianceName" : alliancename
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
        return DB.accessor.query(
            'DELETE FROM alliances WHERE id = $(allianceID) RETURNING *',
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
        return DB.accessor.query(
        'UPDATE alliances SET name = ${newAllianceName} WHERE NOT EXISTS (SELECT name FROM alliances WHERE name = $(newAllianceName)) AND id = $(allianceID) RETURNING *',
            {
                newAllianceName: alliance,
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
    getListUsersById(id){

    }
};