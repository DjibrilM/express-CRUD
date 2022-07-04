import expires from "express"
import {jwtVerification} from "../middlewares/is-auth.js"
import { getPrivateProfile , PublicProfile } from "../controller/user.js" 
const route = expires.Router();


route.get('/pulicProfile/:id', jwtVerification , PublicProfile)
route.get('/privateProfile',jwtVerification, getPrivateProfile)

export default route