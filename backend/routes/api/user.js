import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/index";
const { JWT_SECRET } = config;

import dotenv from "dotenv";
dotenv.config();

import User from "../../models/user";
const router = express.Router();

// @routes      POST api/user
// @desc        Register
// @access      public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  // 빈칸 검증
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "입력되지 않은 값이 있습니다" });
  }

  // 이메일 중복 체크
  User.findOne({ email }).then((user) => {
    if (user)
      return res.status(400).json({ msg: "이미 가입된 유저가 존재합니다" });
    const newUser = new User({ name, email, password });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

export default router;
