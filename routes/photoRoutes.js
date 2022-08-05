const express = require('express');
const router = express.Router();
const db = require('../lib/photoQueries')

const grabAnimals = router.post("/api/photoLabels", (req, res) => {

    // console.log("ROUTE", req.body)
    db.getAnimalNames()
    .then(photo => {
    // console.log("ROUTE SENDS", sites)
        res.json(photo);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });
    
});

const addNewPhoto = router.post("/api/photoAdd", (req, res) => {

    // console.log("ROUTE", req.body)
    db.addPhoto(req.body.File,req.body.Animal, req.body.Date, req.body.Lat, req.body.Lng)
    .then(photo => {
    // console.log("ROUTE SENDS", photo)
        res.json(photo);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });
    
});

module.exports = { grabAnimals, addNewPhoto }