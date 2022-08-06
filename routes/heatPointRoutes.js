const express = require('express');
const router = express.Router();
const db = require('../lib/heatPointQueries')

const getHeatPoints = router.post("/api/heatPoints", (req, res) => {

    db.getAllHeatPoints(req.body.GPSBubble, req.body.SliderValue, req.body.AnimalValue)
    .then(points => {
        res.json(points);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });

    
});

const getSingleHeatPoint = router.post("/api/heatPoint", (req, res) => {

    db.getSingleHeatPoint(req.body.Lat, req.body.Lng, req.body.Animal, req.body.Month)
    .then(points => {
        res.json(points);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });  
});

const addNewHeatPoint = router.post("/api/HeatPointAdd", (req, res) => {

    db.addHeatPoint(req.body.Lat, req.body.Lng, req.body.Animal, req.body.Month)
    .then(point => {
        res.json(point);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });
    
});

const getHeatPointById = router.get("/api/heatPoint/:id", (req, res) => {

    db.getPhotoWaitById(req.params.id)
    .then(photo => {
        res.json(photo);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });
 
});

const UpdateHeatPoint = router.post("/api/HeatPointUpdate", (req, res) => {

    db.updateHeatPoint(req.body.Id, req.body.Weight)
    .then(point => {
        res.json(point);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });
    
});

module.exports = { getHeatPoints, getSingleHeatPoint, addNewHeatPoint, getHeatPointById, UpdateHeatPoint }