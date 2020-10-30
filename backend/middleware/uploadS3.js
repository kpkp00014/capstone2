import moment from "moment";
import path from "path";
import multer from "multer";
import multerS3 from "multer-s3";
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2",
});

// upload middleware
const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: "xcezsimplestorage",
    acl: "public-read",
    key(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, req.user.id + "/" + moment().format("YYYYMMDDhhmmss") + ext);
    },
  }),
});

export default uploadS3;
