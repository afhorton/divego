const { response } = require("express");
const db = require("./db");

const getAllDiveSites = (GPSBubble) => {

    let minLat = GPSBubble.minLat
    let maxLat = GPSBubble.maxLat
    let minLng = GPSBubble.minLng
    let maxLng = GPSBubble.maxLng

    return db.query(`SELECT * FROM diveSites WHERE lat BETWEEN $1 AND $2 AND lng BETWEEN $3 AND $4`, [minLat, maxLat, minLng, maxLng])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const addDiveSite = (name, lat, lng) => {

    return db.query(`INSERT INTO diveSites (name, lat, lng)
    VALUES ($1, $2, $3) RETURNING *;`, [name, lat, lng])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}
module.exports = { getAllDiveSites, addDiveSite }