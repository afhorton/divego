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

    return db.query(`SELECT DISTINCT label FROM photos`)
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


   const getModalPhotos = (values) => {

    let monthVal = values.sliderVal
    let minLat, maxLat, minLng, maxLng

    if (values.maxLat){
       minLat = values.minLat
       maxLat = values.maxLat
       minLng = values.minLng
       maxLng = values.maxLng
    }

    return db.query(`SELECT * FROM photos WHERE EXTRACT(Month from dateTaken) = $1 AND latitude BETWEEN $2 AND $3 AND longitude BETWEEN $4 AND $5`, [monthVal, minLat, maxLat, minLng, maxLng])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
   }
module.exports = { getAnimalNames, getAnimalNamesMobile, addPhoto, getAnimalsFiltered, getModalPhotos }