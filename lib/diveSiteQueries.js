const { response } = require("express");
const db = require("./db");

const getAllDiveSites = (GPSBubble) => {

     // console.log("DB GETS", GPSBubble)
    let minLat = GPSBubble.minLat
    let maxLat = GPSBubble.maxLat
    let minLng = GPSBubble.minLng
    let maxLng = GPSBubble.maxLng

    return db.query(`SELECT * FROM diveSites WHERE lat BETWEEN $1 AND $2 AND lng BETWEEN $3 AND $4`, [minLat, maxLat, minLng, maxLng])
    .then((response) => {
        // console.log("DB SENDS", response.rows)
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { getAllDiveSites }