import express from "express";
import { body } from "express-validator";
import  authControllers from "../controller/auth.js";
import validation from "../helpers/express-validator.js";
const route = express.Router();

route.post("/signup", validation.signup(), authControllers.postSignup);

route.post("/signin", validation.signin(), authControllers.signiIn);

route.post("/getRest", validation.getRest(), authControllers.GetResetPassword);

route.post("/resetPassword", [], authControllers.postResetPassword);

export default route;
