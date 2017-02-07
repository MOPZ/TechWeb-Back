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

module.exports = router;