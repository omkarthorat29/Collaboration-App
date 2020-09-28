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
  let ext = file.originalname.substr(file.originalname.lastIndexOf(".") + 1);
  file.originalname = Date.now() + "." + ext;
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and PNG"), false);
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
          path.extname(file.originalname)
      );
    },
  }),
});

module.exports = upload;
