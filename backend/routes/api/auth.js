import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../../middleware/auth";
import config from "../../config";

const { JWT_SECRET } = config;
import User from "../../models/user";

const router = express.Router();

// @route   POST    api/auth
// @desc    Login
// @access  Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // input에서 빈값이 있는지 확인
  if (!email || !password) {
    return res.status(400).json({ msg: "입력되지 않은 값이 있습니다" });
  }

  // user 존재 여부 확인
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "존재하지 않는 유저입니다" });

    // password 확인
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다" });
      jwt.sign(
        { id: user.id },
        JWT_SECRET,
        { expiresIn: "2 days" },
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

// @route   GET    api/auth/logout
// @desc    Logout
// @access  Public
router.get("/logout", (req, res) => {
  res.json("logout!!");
});

// @route   GET    api/auth/user
// @desc    Login Validation
// @access  Public
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw Error("유저가 존재하지 않습니다");
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

export default router;
