const express = require("express");
app = express();
const path = require("path");
cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({path: `./wetmap/.env.local`});


const { getDiveSites } = require("./routes/diveSiteRoutes")

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "/wetmap/index.html")));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "wetmap/build")));
// }

app.listen(port, () => console.log("Backend server live on " + port));

//DiveSite Routes
app.use(getDiveSites);


// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/wetmap/index.html")
// })