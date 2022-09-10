const { response } = require("express");
const db = require("./db");

const getAnimalNames = () => {

   return db.query(`SELECT DISTINCT label FROM photos `)
   .then((response) => {
       return response.rows;
   })
   .catch((error) => {
       console.log("unable to query db got error:", error);
   })
  }

  const getAnimalNamesMobile = () => {

    return db.query(`SELECT DISTINCT id, label FROM photos `)
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
   }

const addPhoto = (file, animal, date, lat, lng) => {

    return db.query(`INSERT INTO photos (photofile, label, dateTaken, latitude, longitude)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;`, [file, animal, date, lat, lng])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const getAnimalsFiltered = (value) => {

    modifiedText = "%" + value + "%"

    return db.query(`SELECT DISTINCT label FROM photos WHERE label LIKE $1 LIMIT 5`, [modifiedText])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
   }
module.exports = { getAnimalNames, getAnimalNamesMobile, addPhoto, getAnimalsFiltered }