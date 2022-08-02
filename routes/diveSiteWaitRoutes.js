const express = require('express');
const router = express.Router();
const db = require('../lib/diveSiteWaitQueries.js')

const getDiveSiteWaits = router.post("/api/diveSiteWait", (req, res) => {

    // console.log("ROUTE", req.body)
    db.getAllDiveSiteWaits()
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

const addDiveSiteWaiter = router.post("/api/diveSiteWaitAdd", (req, res) => {

    // console.log("ROUTE", req.body)
    db.addDiveSiteWait(req.body.Name, req.body.Lat, req.body.Lng)
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

const getDiveSiteWaitById = router.get("/api/diveSiteWait/:id", (req, res) => {

    // console.log("ROUTE", req.body)
    db.getDiveSiteWaitById(req.params.id)
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