import moment from "moment";
import path from "path";
import multer from "multer";
import multerS3 from "multer-s3";
import { AWS_KEY, AWS_PRIVATE_KEY } from "../config";
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: AWS_KEY,
  secretAccessKey: AWS_PRIVATE_KEY,
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
      console.log(AWS_KEY, "if aws_key is undefined?");
      cb(null, req.user.id + "/" + moment().format("YYYYMMDDhhmmss") + ext);
    },
  }),
});

export default uploadS3;
