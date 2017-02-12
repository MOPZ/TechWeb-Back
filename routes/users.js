var express = require('express');
var router = express.Router();

const UserDAO = require('../models/UserDAO');

router.get('/', function(req, res, next){
    UserDAO.getAll()
        .then((users) => {
            res.status(200)
            .json({
                "status": "success",
                "users" : users
                
            });
        })
        .catch((error) =>
            res.status(500)
            .json({
            status: 'Error',
            message: error
            })
        )
});

router.get('/:id', function(req, res, next) {
    var id = parseInt(req.params.id);
    UserDAO.getById(id)
        .then((user) => {
            res.status(200)
            .json({
                "status": "success",
                "user" : user
            });
        })
        .catch((error) =>
            res.status(500)
            .json({
            status: 'Error',
            message: error
            })
        )
});

router.post('/', function(req,res,next){
    var name = req.body.user.name;
    var allianceID = req.body.user.alliance_id;
    var email= req.body.user.email;
    UserDAO.create(name, email, allianceID)
        .then((user) => {
           res.status(200)
            .json({
                "status": "success",
                "message": "Inserted one user",
                "user" : user
            });
        })
        .catch((error) =>
            res.status(500)
            .json({
            status: 'Error',
            message: error
            })
        )
});

router.delete('/:id', function(req,res,next){
    var id = parseInt(req.params.id);
    UserDAO.deleteUserById(id)
        .then((user) => {
            res.status(200)
            .json({
                "status": "success",
                "message": []
            });
        })
        .catch((error) =>
            res.status(500)
            .json({
            status: 'Error',
            message: error
            })
        )
});

router.put('/:id', function(req,res,next){
    var id = parseInt(req.params.id);
    var username = req.body.user.name;
    var email = req.body.user.email;
    var allianceID = req.body.user.alliance_id
    UserDAO.editUserById(id, username, email, allianceID)
        .then((user) => {
            res.status(200)
            .json({
                "status": "success",
                "message": "modified a user",
                "user": user
            });
        })
        .catch((error) =>
            res.status(500)
            .json({
            status: 'Error',
            message: error
            })
        )
});

router.get('/:id/characters', function(req,res,next){
    var id = parseInt(req.params.id);
    UserDAO.getUserCharactersById(id)
        .then((characters) => {
            res.status(200)
            .json({
                "status": "success",
                "characters": characters
            });
        })
        .catch((error) =>
            res.status(500)
            .json({
            status: 'Error',
            message: error
            })
        )
})

module.exports = router;