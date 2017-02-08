var express = require('express');
var router = express.Router();

const AllianceDAO = require('../models/allianceDAO');

router.get('/', function(req, res, next){
    AllianceDAO.getAll()
        .then((alliance) => {
            res.status(200);
            res.send(alliance);
        });
});

router.get('/:id', function(req, res, next) {
    var id = parseInt(req.params.id);
    AllianceDAO.getById(id)
        .then((alliance) => {
            res.status(200);
            res.send(alliance);
        })
        .catch((error) =>
            res.send(error)
        )
});

router.post('/', function(req, res, next){
    var name = req.body.alliance.name;
    AllianceDAO.create(name)
        .then((alliance) => {
            
            if(alliance.length === 0)
            {
                res.status(500);
                res.send("ALLIANCE_ALREADY_CREATED");
            }
            else
            {
                res.status(200);
                res.send(alliance);
            }
        })
        .catch((error) =>
            res.send(error)
        )
});

/*
Object received : 
{
    "alliance" : {
        "id" : allianceId,
        "name" : allianceName
    }
}
*/
router.delete('/', function(req,res, next){
    var id = parseInt(req.body.alliance.id);
    AllianceDAO.deleteAllianceById(id)
        .then((alliance) => {console.log(alliance);
            if(alliance.length === 0)
            {
                res.status(500);
                res.send('ALLIANCE_NON_EXISTENT');
            }
            else
            {
                res.status(200);
                res.send(alliance);
            }
        })
        .catch((error) => 
            res.send(error)
        )
});

/*
Object received : 
{
    "alliance" : {
        "id" : allianceId,
        "name" : allianceName
    }
}
*/
router.put('/:id', function(req,res,next){
    var id = parseInt(req.params.id);
    var allianceName = req.body.alliance.name;
    AllianceDAO.editAllianceById(id,allianceName)
        .then((alliance) => {
            if(alliance.length === 0)
            {
                res.status(500);
                res.send('NAME_ALREADY_TAKEN_BY_ANOTHER_ALLIANCE');
            }
            else
            {
                res.status(200);
                res.send(alliance);
            }
        })
        .catch((error) => 
            res.send(error)
        )
});

module.exports = router;