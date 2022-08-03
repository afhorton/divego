const { response } = require("express");
const db = require("./db");

const getAllPhotoWaits = () => {

    return db.query(`SELECT * FROM photoWait`)
    .then((response) => {
        // console.log("DB SENDS", response.rows)
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const addPhotoWait = (file, animal, date, lat, lng) => {

     console.log("DB GETS", file, animal, date, lat, lng)

    return db.query(`INSERT INTO photoWait (photofile, label, dateTaken, latitude, longitude)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;`, [file, animal, date, lat, lng])
    .then((response) => {
        // console.log("DB SENDS", response.rows)
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const getPhotoWaitById = (id) => {

    //  console.log("DB GETS", name, lat, lng)

    return db.query(`SELECT * FROM photoWait WHERE id = $1`, [id])
    .then((response) => {
        // console.log("DB SENDS", response.rows)
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const deletePhotoWait = (id) => {

    return db.query(`DELETE FROM photoWait WHERE id= $1 RETURNING *;`, [id])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}
module.exports = { getAllPhotoWaits, addPhotoWait, getPhotoWaitById, deletePhotoWait }