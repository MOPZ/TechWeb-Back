var express = require('express');
var router = express.Router();

const CharDAO = require('../models/characterDAO');

router.get('/', function(req, res, next){
    CharDAO.getAll()
        .then((characters) => {
            res.status(200);
            res.send(characters);
        })
});

router.get('/:id', function(req, res, next) {
    var id = parseInt(req.params.id);
    CharDAO.getById(id)
        .then((character) => {
            res.status(200);
            res.send(character);
        })
        .catch((error) =>
            res.send(error)
        )
});

router.post('/:iduser', function(req, res, next){
    var id = parseInt(req.params.iduser);
    var bodyPost = req.body;
    res.send(bodyPost);
});

router.post('/', function(req,res,next)
{
    var charname = req.body.character.name;
    var charclass = req.body.character.class;
    var user_id = parseInt(req.body.character.userID);
    var position = req.body.character.position;
    //var position = '(456.23, 222.666)'
    CharDAO.createCharacter(charname, charclass,user_id,position)
        .then((character) =>{
            if(character.length === 0)
            {
                res.status(500);
                res.send('CHARACTER_ALREADY_CREATED');
            }
            else
            {
                res.status(200);
                res.send(character);
            }
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
            if(character.length === 0)
            {
                res.status(500);
                res.send('CHARACTER_NON_EXISTENT');
            }
            else
            {
                res.status(200);
                res.send(character);
            }
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
    var user_id = req.body.character.userID;
    var position = req.body.character.position;
    CharDAO.editCharacterById(id,charname, charclass,user_id,position)
        .then((character) =>{
            if(character.length === 0)
            {
                res.status(500);
                res.send('NAME_ALREADY_TAKEN_BY_ANOTHER_CHARACTER');
            }
            else
            {
                res.status(200);
                res.send(character);
            }
        })
        .catch((error) => 
            res.send(error)
        )
});

router.get('/all/:class', function(req,res,next)
{
    var charclass = req.params.class;
    CharDAO.getCharactersByClass(charclass)
        .then((character) =>{
            res.status(200);
            res.send(character);
        })
        .catch((error) => 
            res.send(error)
        )
});

module.exports = router;