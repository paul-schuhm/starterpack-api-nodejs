var express = require('express');
var db = require('../db')
const router = express.Router()


router.get('/concerts', async (req, res, next) => {

    //Développer ici

    //Données de concerts

    //Créer un schéma de base de données mysql (Table Concert)

    const conn = await db.mysql.createConnection(db.dsn);
    const [data] = await conn.execute('SELECT ? + ? AS solution', [1, 1]);
    console.log(data)
    res.status(200).json({"res": data});
});


module.exports = router;