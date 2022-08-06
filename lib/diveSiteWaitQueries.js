const { response } = require("express");
const db = require("./db");

const getAllDiveSiteWaits = () => {

    return db.query(`SELECT * FROM diveSiteWait`)
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const addDiveSiteWait = (name, lat, lng) => {

    return db.query(`INSERT INTO diveSiteWait (name, lat, lng)
    VALUES ($1, $2, $3) RETURNING *;`, [name, lat, lng])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const getDiveSiteWaitById = (id) => {

    return db.query(`SELECT * FROM diveSiteWait WHERE id = $1`, [id])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const deleteDiveSiteWait = (id) => {

    return db.query(`DELETE FROM diveSiteWait WHERE id= $1 RETURNING *;`, [id])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}
module.exports = { getAllDiveSiteWaits, addDiveSiteWait, getDiveSiteWaitById, deleteDiveSiteWait }