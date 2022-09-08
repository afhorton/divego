const { response } = require("express");
const db = require("./db");

const getAllHeatPoints = (GPSBubble, Slider, Animal) => {

 let minLat = GPSBubble.minLat
 let maxLat = GPSBubble.maxLat
 let minLng = GPSBubble.minLng
 let maxLng = GPSBubble.maxLng

 let Species;
 if (Animal === "All"){
   Species = "%%"
 } else {
   Species = "%" + Animal + "%"
 }

 return db.query(`SELECT * FROM heatPoints WHERE lat BETWEEN $1 AND $2 AND lng BETWEEN $3 AND $4 AND animal Like $5 AND "month" = $6`, [minLat, maxLat, minLng, maxLng, Species, Slider])
 .then((response) => {
     return response.rows;
 })
 .catch((error) => {
     console.log("unable to query db got error:", error);
 })
}

const getSingleHeatPoint = (lat, lng, animal, month) => {

  let goodMonth = parseInt(month)

  return db
    .query(
      `SELECT * FROM heatPoints WHERE lat = $1 AND lng = $2 AND "month" = $3 AND animal = $4`,
      [lat, lng, goodMonth, animal]
    )
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

const addHeatPoint = (lat, lng, animal, month) => {
  let weight = 1;
  let goodMonth = parseInt(month)

  return db
    .query(
      `INSERT INTO heatPoints (lat, lng, "weight", animal, "month")
    VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [lat, lng, weight, animal, goodMonth]
    )
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

const getHeatPointByVals = (lat, lng, animal, month) => {

  return db
    .query(
      `SELECT * FROM heatPoints WHERE lat = $1 AND lng = $2 AND animal = $3 and "weight" = $4`,
      [lat, lng, animal, month]
    )
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

const updateHeatPoint = (id, weight) => {

    let newWeight = parseInt(weight) + 1

    return db.query(`UPDATE heatPoints SET "weight" = $1 WHERE id= $2 RETURNING *;`, [newWeight, id])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { getAllHeatPoints, getSingleHeatPoint, addHeatPoint, getHeatPointByVals, updateHeatPoint};
