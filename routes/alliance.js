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

//Revoir le fonctionnement, mettre sécurité si alliance déjà créée
router.post('/:name', function(req, res, next){
    var name = req.params.name;
    AllianceDAO.create(name)
        .then((alliance) => {
            res.status(200);
            res.send(alliance);
        })
        .catch((error) =>
            res.send(error)
        )
});

router.delete('/:id', function(req,res, next){
    var id = parseInt(req.params.id);
    AllianceDAO.deleteAllianceById(id)
        .then((alliance) => {
            res.status(200);
            res.send(alliance);
        })
        .catch((error) => 
            res.send(error)
        )
});

router.put('/:id', function(req,res,next){
    console.log('entered', req.body);
    var id = parseInt(req.body.alliance.id);
    var allianceName = req.body.alliance.name;
    AllianceDAO.editAllianceById(id,allianceName)
        .then((alliance) => {
            res.status(200);
            res.send(alliance);
        })
        .catch((error) => 
            res.send(error)
        )
});

module.exports = router;