const express = require('express');
const router = express.Router();
const db = require('../lib/adminQueries')
const bcrypt = require('bcrypt')

const checkAdmin = router.post("/api/session", (req, res) => {

    // const hashedPassword = bcrypt.hashSync('', 10)
    // console.log('hashedPassword', hashedPassword)

    db.adminCheck(req.body.pass)
    .then(user => {
        let check = bcrypt.compareSync(req.body.pass,user[0].pass);
        if (check){
            res.send("green");
        } else {
            res.send("red");
        }
    })
    .catch(err => {
        res.json(undefined);
    });
});

module.exports = { checkAdmin }