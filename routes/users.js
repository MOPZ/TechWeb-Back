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

router.post('/:name', function(req,res,next){
    var name = req.params.name;
    UserDAO.create(name)
        .then((user) => {
            res.status(200);
            res.send(user);
        })
        .catch((error) =>
            res.send(error)
        )
})

module.exports = router;