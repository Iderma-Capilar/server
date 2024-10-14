import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createServer } from "http";
import { createServer as createHttpsServer } from "https";
import fs from "fs";
import bodyParser from "body-parser";
import compression from "compression";

const { NODE_LOCAL_PORT, NODE_LOCAL_HTTPS_PORT } = process.env;
import routes from "./src/routes/index.js";
import { connectToDatabase } from "./src/database/index.js";

import "./src/database/models/associatons.js";
//prueba para discord webhook
const app = express();

// Leer los certificados SSL
const options = {
  key: fs.readFileSync("./ssl/privkey1.pem"),
  cert: fs.readFileSync("./ssl/fullchain1.pem"),
};

const httpServer = createServer(app);
const httpsServer = createHttpsServer(options, app);

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(
  compression({
    level: 6,
    threshold: 1024,
    filter: (req, res) => {
      return (
        /json|text|javascript|css|html/i.test(res.get("Content-Type")) &&
        req.acceptsEncodings().includes("br")
      );
    },
  })
);

app.use("/", routes);

app.get("/", (_req, res) => res.status(200).send("Server running"));

connectToDatabase()
  .then(() => {
    // Escuchar en el puerto HTTP
    httpServer.listen(NODE_LOCAL_PORT, () => {
      console.log(`HTTP Server running on port ${NODE_LOCAL_PORT}`);
    });
    // Escuchar en el puerto HTTPS
    httpsServer.listen(NODE_LOCAL_HTTPS_PORT, () => {
      console.log(`HTTPS Server running on port ${NODE_LOCAL_HTTPS_PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
