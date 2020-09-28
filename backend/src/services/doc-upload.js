const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
aws.config.update({
  secretAccessKey: "h24kWCyQy2OLQ1u//viza/afR6pXXvhH1vH2W9Cb",
  accessKeyId: "AKIARSHCWIZFQKVPQV7E",
  region: "ap-south-1",
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  console.log(file);
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "text/plain" ||
    file.mimetype === "application/octet-stream" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only documents are allowed"), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: "suvarsh-images",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_META_DATA!" });
    },
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
});

module.exports = upload;
