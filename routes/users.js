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

module.exports = router;
