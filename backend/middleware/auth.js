import jwt from "jsonwebtoken";
import config from "../config/index";
const { JWT_SECRET } = config;

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "no toekn, access denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "token is not available" });
  }
};

export default auth;
