const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer")

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
const uploadPhoto = router.post("/api/upload", upload.single('image'), (req, res) => {

 fileToSend = req.file.filename
  console.log('ROUTE secret', req.file.filename)
  res.json({fileName : req.file.filename});

});

const viewUploadedPhotos = router.get("/api/upload", (req, res) => {
  res.json(fileToSend);
});

module.exports = { uploadPhoto, viewUploadedPhotos};
