const express = require('express');
const router = express.Router();
const db = require('../lib/diveSiteQueries.js')

const getDiveSites = router.get("/api/divesites", (req, res) => {

    db.getAllDiveSites()
    .then(sites => {
        res.json(sites);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });

    
});

module.exports = { getDiveSites }