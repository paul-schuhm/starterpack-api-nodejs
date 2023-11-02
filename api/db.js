/**
 * Export et test de la connexion à la base de données MySQL
 */

const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'db',
    database: 'mydb',
    user: 'user',
    password: 'password',
})

connection.connect()

connection.query('SELECT 1 + 2 AS solution', (err, rows, fields) => {
    if (err) throw err
    console.log('The solution is: ', rows[0].solution)
})


// connection.end()
module.exports = connection
