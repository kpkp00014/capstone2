import express from "express";
import mongoose from "mongoose";
import config from "./config";
import hpp from "hpp";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
//routes
import projectRoutes from "./routes/api/project";
import authRoutes from "./routes/api/auth";
import userRoutes from "./routes/api/user";
import storageRoutes from "./routes/api/storage";
const app = express();
const { MONGO_URI } = config;

//서버의 보안을 보완해줌
app.use(hpp());
app.use(helmet());
// 크로스도메인 허용
app.use(cors({ origin: true, credentials: true }));
//개발 환경중 로그
app.use(morgan("dev"));

app.use(express.json());

/*               라우터                 */
app.get("/");
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/storage", storageRoutes);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connecting Success!!"))
  .catch((e) => console.log(e));

export default app;
