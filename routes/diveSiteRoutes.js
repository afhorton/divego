const express = require('express');
const router = express.Router();
const db = require('../lib/diveSiteQueries.js')

const getDiveSites = router.post("/api/diveSites", (req, res) => {

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

const addNewDiveSite = router.post("/api/diveSiteAdd", (req, res) => {

    console.log("ROUTE", req.body)
    db.addDiveSite(req.body.Name, req.body.Lat, req.body.Lng)
    .then(site => {
    // console.log("ROUTE SENDS", sites)
        res.json(site);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });
    
});

module.exports = { getDiveSites, addNewDiveSite }