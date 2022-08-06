const express = require('express');
const router = express.Router();
const db = require('../lib/diveSiteWaitQueries.js')

const getDiveSiteWaits = router.post("/api/diveSiteWait", (req, res) => {

    db.getAllDiveSiteWaits()
    .then(sites => {
        res.json(sites);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });
 
});

const addDiveSiteWaiter = router.post("/api/diveSiteWaitAdd", (req, res) => {

    db.addDiveSiteWait(req.body.Name, req.body.Lat, req.body.Lng)
    .then(site => {
        res.json(site);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });
    
});

const getDiveSiteWaitById = router.get("/api/diveSiteWait/:id", (req, res) => {

    db.getDiveSiteWaitById(req.params.id)
    .then(site => {
        res.json(site);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
    });
 
});

const delDiveSiteWait = router.delete("/api/diveSiteWait/delete/:id", (req, res) => {

    db.deleteDiveSiteWait(req.params.id)
    .then(site => {
        res.json(site);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});


module.exports = { getDiveSiteWaits, addDiveSiteWaiter, getDiveSiteWaitById, delDiveSiteWait }