import express from "express";
const routers = express.Router();
import user from "./user.js";
import blog from "./blogs.js";
import auth from "./auth.js";

routers.use("/user", user);
routers.use("/blog", blog);
routers.use("/auth", auth);

export { routers };
