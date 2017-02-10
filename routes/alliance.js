var express = require('express');
var router = express.Router();

const AllianceDAO = require('../models/allianceDAO');

router.get('/', function(req, res, next){
    AllianceDAO.getAll()
        .then((alliance) => {
            res.status(200)
            .json({
                "status": "success",
                "alliances": alliance
            })
        });
});

router.get('/:id', function(req, res, next) {
    var id = parseInt(req.params.id);
    AllianceDAO.getById(id)
        .then((alliance) => {
            res.status(200)
            .json({
                "status": "success",
                "alliance": alliance
            })
        })
        .catch((error) =>
            res.send(error)
        )
});

router.post('/', function(req, res, next){
    var name = req.body.alliance.name;
    AllianceDAO.create(name)
        .then((alliance) => {
           res.status(200)
            .json({
                "status": "success",
                "message": "Inserted one alliance",
                "alliance": alliance
            })
        })
        .catch((error) =>
            res.send(error)
        )
});

router.delete('/:id', function(req,res, next){
    var id = parseInt(req.params.id);
    AllianceDAO.deleteAllianceById(id)
        .then((alliance) => {
            res.status(200)
            .json({
                "status": "success",
                "message": []
            })
        })
        .catch((error) => 
            res.send(error)
        )
});

router.put('/:id', function(req,res,next){
    var id = parseInt(req.params.id);
    var allianceName = req.body.alliance.name;
    AllianceDAO.editAllianceById(id,allianceName)
        .then((alliance) => {
            res.status(200)
            .json({
                "status": "success",
                "message": "modified a alliance",
                "alliance": alliance
            })
        })
        .catch((error) => 
            res.send(error)
        )
});

router.get('/:id/users', function(req,res,next){
    var id = parseInt(req.params.id);
    AllianceDAO.getListUsersById(id)
        .then((alliance) => {
            res.status(200);
            res.send(alliance);
        })
        .catch((error) => 
            res.send(error)
        )
});

router.get('/:id/characters', function(req,res,next){
    var id = parseInt(req.params.id);
    AllianceDAO.getListCharactersById(id)
        .then((alliance) => {
            res.status(200);
            res.send(alliance);
        })
        .catch((error) => 
            res.send(error)
        )
});

router.get('/:id/characters/:classname', function(req,res,next){
    var id = parseInt(req.params.id);
    var classname = req.params.classname
    AllianceDAO.getListCharactersByClass(id, classname)
        .then((alliance) => {
            res.status(200);
            res.send(alliance);
        })
        .catch((error) => 
            res.send(error)
        )
});

module.exports = router;