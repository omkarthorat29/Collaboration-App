const express = require("express");
const router = express.Router();

const upload = require("../services/doc-upload");

const singleUpload = upload.single("doc");

router.post("/doc-upload", function (req, res) {
  singleUpload(req, res, function (err) {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "File Upload Error", detail: err.message }],
      });
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log("Error: No File Selected!");
        res.json("Error: No File Selected");
      } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location; // Save the file name into database into profile modelres.json( {
        res.json({
          image: imageName,
          location: imageLocation,
          originalname: req.file.originalname,
        });
      }
    }
  });
});

module.exports = router;
