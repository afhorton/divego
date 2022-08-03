const express = require('express');
const router = express.Router();
const db = require('../lib/photoWaitQueries.js')

const getPhotoWaits = router.post("/api/photoWait", (req, res) => {

    // console.log("ROUTE", req.body)
    db.getAllPhotoWaits()
    .then(photos => {

    // console.log("ROUTE SENDS", sites)
        res.json(photos);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });
 
});

const addPhotoWaiter = router.post("/api/photoWaitAdd", (req, res) => {

    // console.log("ROUTE", req.body)
    db.addPhotoWait(req.body.File, req.body.Animal, req.body.Date, req.body.Lat, req.body.Lng)
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

const getPhotoWaitById = router.get("/api/photoWait/:id", (req, res) => {

    // console.log("ROUTE", req.body)
    db.getPhotoWaitById(req.params.id)
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

const delPhotoWait = router.delete("/api/photoWait/delete/:id", (req, res) => {

    db.deletePhotoWait(req.params.id)
    .then(photo => {
        res.json(photo);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});


module.exports = { getPhotoWaits, addPhotoWaiter, getPhotoWaitById, delPhotoWait }