var express = require('express');
var router = express.Router();
var connection = require('../db');

/* GET home page. */
router.get('/', function (req, res, next) {

  // #swagger.summary = "Page d'accueil"

  connection.query('SELECT * FROM User;', (error, rows, fields) => {


    if (error) {
      console.error('Error connecting: ' + err.stack);
      return;
    }

    const users = rows.map(element => {
      return {
        firstName: element.first_name
      }
    });
    res.render('index', { title: 'RESTful web api', 'users': users });
  })

});

module.exports = router;
