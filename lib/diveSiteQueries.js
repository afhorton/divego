const { response } = require("express");
const db = require("./db");

const getAllDiveSites = () => {

    return db.query(`SELECT * FROM diveSites`)
    .then((response) => {
        console.log(response.rows)
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { getAllDiveSites }