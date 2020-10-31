import express from "express";
import { isNullOrUndefined } from "util";
import auth from "../../middleware/auth";
import uploadS3 from "../../middleware/uploadS3";
import { AWS_KEY, AWS_PRIVATE_KEY } from "../../config";
const router = express.Router();

const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: AWS_KEY,
  secretAccessKey: AWS_PRIVATE_KEY,
  region: "ap-northeast-2",
});

// @route   POST    api/storage
// @desc    get aws s3 object list
// @access  Public
router.get("/", auth, (req, res) => {
  var params = {
    Bucket: "xcezsimplestorage",
    Delimiter: "",
    Prefix: req.user.id,
  };
  try {
    s3.listObjects(params, function (err, data) {
      if (err) throw err;

      res.json(data);
    });
  } catch (err) {
    console.log(err);
  }
});

// @route   POST    api/storage/upload
// @desc    add new file to aws s3
// @access  Public
router.post("/upload", auth, uploadS3.single("file"), (req, res) => {
  try {
    res.json({ uploaded: true });
  } catch (e) {
    console.error(e);
    res.json({ uploaded: false, url: null });
  }
});

// @route   POST    api/storage/delete
// @desc    delete file from aws s3
// @access  Public
router.post("/delete", auth, (req, res) => {
  try {
    let param = {
      Bucket: "xcezsimplestorage",
      Key: req.body.content,
    };
    s3.deleteObject(param, function (err, data) {
      if (err) console.log(err);
      else console.log(data);
    });
    param = {
      Bucket: "xcezsimplestorage",
      Delimiter: "",
      Prefix: req.user.id,
    };
    s3.listObjects(param, function (err, data) {
      if (err) throw err;

      res.json(data);
    });
  } catch (e) {
    console.error(e);
    res.json({ delete: false, url: null });
  }
});
export default router;
