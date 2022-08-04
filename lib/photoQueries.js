const { response } = require("express");
const db = require("./db");

const addPhoto = (file, animal, date, lat, lng) => {

    //  console.log("DB GETS", name, lat, lng)

    return db.query(`INSERT INTO photos (photofile, label, dateTaken, latitude, longitude)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;`, [file, animal, date, lat, lng])
    .then((response) => {
        // console.log("DB SENDS", response.rows)
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}
module.exports = { addPhoto }