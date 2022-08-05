const { response } = require("express");
const db = require("./db");

const adminCheck = (pass) => {

    let ID = 1

    return db.query(`SELECT * FROM administrator WHERE id = $1;`, [ID])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { adminCheck }