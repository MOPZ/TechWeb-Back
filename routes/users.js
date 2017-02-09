var express = require('express');
var router = express.Router();

const UserDAO = require('../models/UserDAO');

router.get('/', function(req, res, next){
    UserDAO.getAll()
        .then((users) => {
            res.status(200);
            res.send(users);
        });
});

router.get('/:id', function(req, res, next) {
    var id = parseInt(req.params.id);
    UserDAO.getById(id)
        .then((user) => {
            res.status(200);
            res.send(user);
        })
        .catch((error) =>
            res.send(error)
        )
});

router.post('/', function(req,res,next){
    var name = req.body.user.name;
    var allianceID = req.body.user.allianceID;
    var email= req.body.user.email;
    UserDAO.create(name, email, allianceID)
        .then((user) => {
            if(user.length === 0)
            {
                res.status(500).json ({
                    status: 'Error',
                    message : 'USER_ALREADY_CREATED'
                })
            }
            else
            {
                res.status(200);
                res.send(user);
            }
        })
        .catch((error) =>
            res.send(error)
        )
});

router.delete('/:id', function(req,res,next){
    var id = parseInt(req.params.id);
    UserDAO.deleteUserById(id)
        .then((user) => {
            if(user.length === 0)
            {
                res.status(500).json ({
                    status: 'Error',
                    message : 'USER_NON_EXISTENT'
                })
            }
            else
            {
                res.status(200);
                res.send(user);
            }
        })
        .catch((error) =>
            res.send(error)
        )
});

router.put('/:id', function(req,res,next){
    var id = parseInt(req.params.id);
    var username = req.body.user.name;
    var email = req.body.user.email;
    var allianceID = req.body.user.alliance_id
    UserDAO.editUserById(id, username, email, allianceID)
        .then((user) => {
            res.status(200);
            res.send(user);
        })
        .catch((error) =>
            res.send(error)
        )
})

module.exports = router;