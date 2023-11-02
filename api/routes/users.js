var express = require('express');
var router = express.Router();
var connection = require('../db')

/* GET users listing. */
router.get('/users', function (req, res, next) {


  connection.query(
    'SELECT * FROM `User` WHERE `first_name` = ?',
    ['Eve'],
    function (err, rows, fields) {
      const users = rows.map(element => {
        return {
          firstName: element.first_name
        }
      });
      res.send(users);
    }
  );


});

module.exports = router;
