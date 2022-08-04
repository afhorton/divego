const express = require("express");
app = express();
const path = require("path");
cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: `./wetmap/.env.local` });
const multer = require("multer")

const { getDiveSites, addNewDiveSite } = require("./routes/diveSiteRoutes");
const {
  getDiveSiteWaits,
  addDiveSiteWaiter,
  getDiveSiteWaitById,
  delDiveSiteWait,
} = require("./routes/diveSiteWaitRoutes");
const { addNewPhoto } = require("./routes/photoRoutes");
const {
  getPhotoWaits,
  addPhotoWaiter,
  getPhotoWaitById,
  delPhotoWait,
} = require("./routes/photoWaitRoutes");
const { uploadPhoto, viewUploadedPhotos } = require("./routes/uploadRoutes");

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
//Upload Routes
// app.use(upload, express.static(path.join(__dirname, "./src/components/uploads")));
app.use(uploadPhoto);
app.use(viewUploadedPhotos);

//DiveSite Routes
app.use(getDiveSites);
app.use(addNewDiveSite);

//DiveSiteWait Routes
app.use(getDiveSiteWaits);
app.use(addDiveSiteWaiter);
app.use(getDiveSiteWaitById);
app.use(delDiveSiteWait);

//Photo Routes
app.use(addNewPhoto);

//PhotoWait Routes
app.use(getPhotoWaits);
app.use(addPhotoWaiter);
app.use(getPhotoWaitById);
app.use(delPhotoWait);


// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/wetmap/index.html")
// })
