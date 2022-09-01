const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./wetmap/src/components/uploads")
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage})

let fileToSend;
let jerk;
const uploadPhoto = router.post("/api/upload", upload.single('image'), (req, res) => {

 fileToSend = req.file.filename

 Promise.all([fileToSend])
 .then((response) => {
   jerk = response[0]
 })
 .catch((error) => {
   console.log(error);
 });

  res.json({fileName : req.file.filename});

});

const viewUploadedPhotos = router.get("/api/upload", (req, res) => {
  res.json(jerk);
});

const removeUploadedPhoto = router.post("/api/upload/delete", (req, res) => {

  let filePath = req.body.path
  let fileName = req.body.fileName

  if (fileName === null){
    return
  } else {
    fs.unlinkSync(path.join( filePath, fileName))
  }
 
});

module.exports = { uploadPhoto, viewUploadedPhotos, removeUploadedPhoto};
