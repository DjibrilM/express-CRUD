import express from "express";
import { jwtVerification } from "../middlewares/is-auth.js";
import userProfileControllers from "../controller/user.js";
const route = express.Router();

route.get(
  "/pulicProfile/:id",
  jwtVerification,
  userProfileControllers.PublicProfile
);
route.get(
  "/privateProfile",
  jwtVerification,
  userProfileControllers.getPrivateProfile
);

export default route;
