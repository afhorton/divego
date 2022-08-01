const express = require('express');
const router = express.Router();
const db = require('../lib/diveSiteQueries.js')

const getDiveSites = router.post("/api/divesites", (req, res) => {

    // console.log("ROUTE", req.body)
    db.getAllDiveSites(req.body.GPSBubble)
    .then(sites => {

    // console.log("ROUTE SENDS", sites)
        res.json(sites);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });

    
});

module.exports = { getDiveSites }