import express from "express";
import bodyParser from "body-parser";
import path from "path";
import multerCofig from "./src/helpers/mullter-config.js";
import CORS from "./src/helpers/CORS-CONFIG.js";
import { DB_CONNECT } from "./src/models/DB.js";
import { fileURLToPath } from 'url';
import { routers } from "./src/routes/index.js";
const app = express();
//dot env configuration
import dotenv from "dotenv";
dotenv.config();
//end env configurations

//multerconfig
multerCofig.mullterConfig(app);
//
//CORS configuration
CORS.CORS_CONFIG(app);
//

//images path request
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images",  express.static(path.join(__dirname, "images")));
//

// app.use('api/v2/',routers)
app.use("/api/v2", routers);

//bad request
app.use("*", (req, res) => {
  res.status(404).json({ message: "Bad Request." });
});

DB_CONNECT.connect();

//app listen
const PORT = process.env.PORT || 3000;
app.listen(PORT);
