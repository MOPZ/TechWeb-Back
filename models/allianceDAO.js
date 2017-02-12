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
                return result[0];
            })
    },
    create(alliancename){
        return DB.accessor.query(
            'INSERT INTO alliances(name) '
            + 'SELECT $(allianceName) RETURNING *',
            //+ 'FROM (values(1)) as TMP '
            //+ 'WHERE NOT EXISTS (SELECT name from alliances WHERE name = $(allianceName)) RETURNING *',
            {
                "allianceName" : alliancename
            }
            )
            .then((result) => {
                return result[0];
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
                return result[0];
            })
            .catch((error) => {
                throw error;
            })
        
    },
    editAllianceById(id, alliance){
        return DB.accessor.query(
        'UPDATE alliances SET name = ${newAllianceName} '
        +'WHERE id = $(allianceID) RETURNING *',
            {
                newAllianceName: alliance,
                allianceID: id
            }
        )
        .then((result) => {
                return result[0];
            })
            .catch((error) => {
                throw error;
            })
    },
    getListUsersById(id){
        return DB.accessor.query(
            'SELECT * FROM users WHERE alliance_id = 1'
        )
        .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    },
    getListCharactersById(id){
        return DB.accessor.query(
            'SELECT characters.* from characters, users '
            +'WHERE users.alliance_id = $(allianceID) and characters.user_id = users.id',
            {
                allianceID : id
            }
        )
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
        
    },
    getListCharactersByClass(id, className){
        return DB.accessor.query(
            'SELECT characters.* from characters, users '
            +'WHERE characters.class = $(classname) AND users.alliance_id = $(allianceID) AND characters.user_id = users.id',
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