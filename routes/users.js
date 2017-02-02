var express = require('express');
var router = express.Router();
const userDAO = require('../models/userDAO');

/* GET users listing. */
router.get('/', function(req, res, next) {
  userDAO.getAll()
  	.then((users) => {
  		res.send(users);
  	});
});

router.get('/:id', function(req, res, next){
  var id = parseInt(req.params.id);
  userDAO.getById(id)
  	.then((user) => {
  		res.send(user)
  	})
  	.catch((error) =>
  		res.send(error)
  	)
});

//POST /users : créer un user avec (name, email, alliance_id) + 200 + nouvel user


module.exports = router;
