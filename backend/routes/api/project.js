import express from "express";
import moment from "moment";
import { isNullOrUndefined } from "util";
import auth from "../../middleware/auth";
import project from "../../models/proejct";
import Project from "../../models/proejct";
import User from "../../models/user";
import Item from "../../models/item";
import nodeHtmlToImage from "node-html-to-image";
import multer from "multer";
import multerS3 from "multer-s3";
import { AWS_KEY, AWS_PRIVATE_KEY } from "../../config";
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: AWS_KEY,
  secretAccessKey: AWS_PRIVATE_KEY,
  region: "ap-northeast-2",
});

const router = express.Router();

// GET  api/project
router.get("/", (req, res) => {
  res.send("hello world!");
});

// @route   POST    api/project/init
// @desc    init new project
// @access  Public
router.post("/init", auth, async (req, res) => {
  try {
    const newProject = await Project.create({
      name: req.body.pName,
      owner: req.user.id,
    });
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        projects: newProject._id,
      },
    });
    res.json({
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
});

// @route   GET    api/project/list
// @desc    get project list
// @access  Public
router.get("/list", auth, async (req, res) => {
  const projectFindResult = await User.findById(req.user.id).populate({
    path: "projects",
  });
  const result = projectFindResult.projects;
  res.json(result);
});

// @route   POST    api/project/add
// @desc    add project item
// @access  Public
router.post("/add", auth, async (req, res) => {
  const { project, content, isImage } = req.body;
  const newItem = await Item.create({
    owner: req.user.id,
    isImage: isImage,
    content: content,
    project: project,
  });
  await User.findByIdAndUpdate(req.user.id, {
    $push: {
      items: newItem._id,
    },
  });
  await Project.findByIdAndUpdate(project, {
    $push: {
      items: newItem._id,
    },
  });
  const projectFindResult = await Project.findById(project).populate({
    path: "items",
  });
  const result = projectFindResult.items;
  res.json(result);
});

// @route   POST    api/project/item
// @desc    get project item list
// @access  Public
router.post("/item", auth, async (req, res) => {
  const { project } = req.body;
  const projectFindResult = await Project.findById(project).populate({
    path: "items",
  });
  const result = projectFindResult.items;
  res.json(result);
});

// @route   POST    api/project/terminate
// @desc    delete project
// @access  Public
router.post("/terminate", auth, async (req, res) => {
  const { project } = req.body;
  const projectInfo = await Project.findById(project).populate({
    path: "items",
  });
  if (projectInfo.owner == req.user.id) {
    await Item.deleteMany({ project: project });
    await Project.findByIdAndDelete(project);
    await User.findByIdAndUpdate(req.user.id, {
      $pull: {
        projects: project,
      },
    });
    res.json({ success: true });
  } else {
    // 프로젝트의 소유자가 요청자가 아닌 경우
    res.status(400).json({ msg: "잘못된 요청입니다." });
  }
});

// @route   POST    api/project/export
// @desc    export project
// @access  Public
router.post("/export", auth, async (req, res) => {
  const { project } = req.body;
  const projectFind = await Project.findById(project).populate({
    path: "items",
  });
  const result = projectFind.items;
  let html = `<html><head><style>
  @import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);
  
  body {
    width: 600px;
    min-height: 10px;
  }
  img {
    width: 100%;
    vertical-align: middle;
    border-style: none;
  }
  span {
    font-family: 'Nanum Gothic', sans-serif;  
    font-size: 1.5em;
  }
  </style></head><body>`;

  result.forEach((item) => {
    if (item.isImage) {
      html += `<div><img src=${item.content} /></div>`;
    } else {
      html += `<div><span>${item.content}</span></div>`;
    }
  });
  html += "</body></html>";
  const filepath = `${req.user.id}/ProjectResult_${moment().format(
    "YYMMDDhhmmss"
  )}.png`;
  console.log("EXPORTIMAGE before nodeHTMLTOIMAGE");
  const image = await nodeHtmlToImage({
    html: html,
    puppeteerArgs: { args: ["--no-sandbox", "--disable-setuid-sandbox"] },
  });
  console.log("SUCCESS nodeHTMLTOIMAGE");
  let param = {
    Bucket: "xcezsimplestorage",
    ACL: "public-read",
    Key: filepath,
    Body: image,
    ContentType: "image/png",
  };
  s3.upload(param, function (err, data) {
    if (err) console.log(err);
  });
  res.json({ success: true });
});

// @route   POST    api/project/delete
// @desc    delete project item
// @access  Public
router.post("/delete", auth, async (req, res) => {
  const { project, content } = req.body;
  const itemFind = await Item.findById(content);
  if (itemFind.owner == req.user.id) {
    await Item.findByIdAndDelete(content);
    await Project.findByIdAndUpdate(project, {
      $pull: {
        items: content,
      },
    });
    const projectFindResult = await Project.findById(project).populate({
      path: "items",
    });
    const result = projectFindResult.items;
    res.json(result);
  } else {
    res.status(400).json({ msg: "잘못된 요청입니다." });
  }
  res.json({ success: true });
});

export default router;
