const { response } = require("express");
const db = require("./db");

const getSingleHeatPoint = (lat, lng, animal, month) => {

  let goodMonth = parseInt(month)

  console.log("converted", goodMonth)
  return db
    .query(
      `SELECT * FROM heatPoints WHERE lat = $1 AND lng = $2 AND "month" = $3 AND animal = $4`,
      [lat, lng, goodMonth, animal]
    )
    .then((response) => {
      console.log("DB SENDS", response.rows)
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

const addHeatPoint = (lat, lng, animal, month) => {
  let weight = 1;
  let goodMonth = parseInt(month)
   console.log("DB GETS", lat, lng, animal, month)

  return db
    .query(
      `INSERT INTO heatPoints (lat, lng, "weight", animal, "month")
    VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [lat, lng, weight, animal, goodMonth]
    )
    .then((response) => {
      // console.log("DB SENDS", response.rows)
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

const getHeatPointByVals = (lat, lng, animal, month) => {
  //  console.log("DB GETS", name, lat, lng)

  return db
    .query(
      `SELECT * FROM heatPoints WHERE lat = $1 AND lng = $2 AND animal = $3 and "weight" = $4`,
      [lat, lng, animal, month]
    )
    .then((response) => {
      // console.log("DB SENDS", response.rows)
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

module.exports = { getSingleHeatPoint, addHeatPoint, getHeatPointByVals, updateHeatPoint};
