var express = require('express');
var router = express.Router();

const CharDAO = require('../models/characterDAO');

router.get('/', function(req, res, next){
    CharDAO.getAll()
        .then((characters) => {
            res.status(200)
            .json({
                "status": "success",
                "characters": characters
            })
        })
});

router.get('/:id', function(req, res, next) {
    var id = parseInt(req.params.id);
    CharDAO.getById(id)
        .then((character) => {
            res.status(200)
            .json({
                "status": "success",
                "character": character
            })
        })
        .catch((error) =>
            res.send(error)
        )
});

router.post('/', function(req,res,next)
{
    var charname = req.body.character.name;
    var charclass = req.body.character.class;
    var user_id = parseInt(req.body.character.user_id);
    var position = req.body.character.position;
    CharDAO.createCharacter(charname, charclass,user_id,position)
        .then((character) => {
            res.status(200)
            .json({
                "status": "success",
                "message": "Inserted one character",
                "character": character
            })
        })
        .catch((error) =>
            res.send(error)
        )
});

router.delete('/:id', function(req,res,next)
{
    var id = req.params.id;
    CharDAO.deleteCharacterById(id)
        .then((character) =>{
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

router.put('/:id', function(req,res,next)
{
    var id = req.params.id;
    var charname = req.body.character.name;
    var charclass = req.body.character.class;
    var user_id = req.body.character.user_id;
    var position = req.body.character.position;
    CharDAO.editCharacterById(id,charname, charclass,user_id,position)
        .then((character) =>{
            res.status(200)
            .json({
                "status": "success",
                "message": "modified a character",
                "character": character
            })
        })
        .catch((error) => 
            res.send(error)
        )
});

router.get('/all/:class', function(req,res,next)
{
    var charclass = req.params.class;
    CharDAO.getCharactersByClass(charclass)
        .then((characters) =>{
            res.status(200)
            .json({
                "status": "success",
                "characters":characters
            });
        })
        .catch((error) => 
            res.send(error)
        )
});

router.get('/:id/allies/:radius', function(req,res,next)
{
    var id = parseInt(req.params.id);
    var radius = parseInt(req.params.radius);
    CharDAO.getAlliesCharacterByRadius(id, radius)
        .then((characters) =>{
            res.status(200)
            .json({
                "status": "success",
                "characters": characters
            })
        })
        .catch((error) => 
            res.send(error)
        )
});

router.get('/:id/ennemies/:radius', function(req,res,next)
{
    var id = parseInt(req.params.id);
    var radius = parseInt(req.params.radius);
    CharDAO.getEnnemiesCharacterByRadius(id, radius)
        .then((characters) =>{
            res.status(200)
            .json({
                "status": "success",
                "characters": characters
            })
        })
        .catch((error) => 
            res.send(error)
        )
});


module.exports = router;