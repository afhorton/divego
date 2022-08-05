const express = require('express');
const router = express.Router();
const db = require('../lib/heatPointQueries')

const getHeatPoints = router.post("/api/heatPoints", (req, res) => {

    // console.log("ROUTE", req.body)
    db.getAllHeatPoints(req.body.GPSBubble, req.body.SliderValue, req.body.AnimalValue)
    .then(points => {

    // console.log("ROUTE SENDS", sites)
        res.json(points);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });

    
});

const getSingleHeatPoint = router.post("/api/heatPoint", (req, res) => {

    // console.log("ROUTE", req.body)
    db.getSingleHeatPoint(req.body.Lat, req.body.Lng, req.body.Animal, req.body.Month)
    .then(points => {

    // console.log("ROUTE SENDS", points)
        res.json(points);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });  
});

const addNewHeatPoint = router.post("/api/HeatPointAdd", (req, res) => {

    //  console.log("ROUTE", req.body)
    db.addHeatPoint(req.body.Lat, req.body.Lng, req.body.Animal, req.body.Month)
    .then(point => {
    // console.log("ROUTE SENDS", point)
        res.json(point);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });
    
});

const getHeatPointById = router.get("/api/heatPoint/:id", (req, res) => {

    // console.log("ROUTE", req.body)
    db.getPhotoWaitById(req.params.id)
    .then(photo => {

    // console.log("ROUTE SENDS", point)
        res.json(photo);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });
 
});

const UpdateHeatPoint = router.post("/api/HeatPointUpdate", (req, res) => {

    console.log("ROUTE", req.body)
    db.updateHeatPoint(req.body.Id, req.body.Weight)
    .then(point => {
    console.log("ROUTE SENDS", point)
        res.json(point);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });
    
});

module.exports = { getHeatPoints, getSingleHeatPoint, addNewHeatPoint, getHeatPointById, UpdateHeatPoint }