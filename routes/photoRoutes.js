const express = require('express');
const router = express.Router();
const db = require('../lib/photoQueries')

const grabAnimalsMobile = router.post("/api/photoLabelsMobile", (req, res) => {

    db.getAnimalNamesMobile()
    .then(photo => {
        res.json(photo);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });
    
});

const grabAnimals = router.post("/api/photoLabels", (req, res) => {

    db.getAnimalNames()
    .then(photo => {
        res.json(photo);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });
    
});

const addNewPhoto = router.post("/api/photoAdd", (req, res) => {

    db.addPhoto(req.body.File, req.body.Animal, req.body.Date, req.body.Lat, req.body.Lng)
    .then(photo => {
        res.json(photo);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });
    
});

const filterAnimals = router.post("/api/photoLabelsThatFit", (req, res) => {

    db.getAnimalsFiltered(req.body.content)
    .then(photo => {
        res.json(photo);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });
    
});

module.exports = { grabAnimals, grabAnimalsMobile, addNewPhoto, filterAnimals }