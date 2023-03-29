var express = require('express');
var router = express.Router();
var connection = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM User;',  (error, rows, fields) => {
    const users = rows.map(element => {
      return {
        firstName: element.first_name
      }
    });
    res.render('index', { title: 'RESTful web api', 'users': users });
  })
 
});

module.exports = router;
