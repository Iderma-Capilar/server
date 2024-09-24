import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createServer } from "http";
import bodyParser from "body-parser";
import compression from "compression";

const { NODE_LOCAL_PORT } = process.env;
import routes from "./src/routes/index.js";
import { connectToDatabase } from "./src/database/index.js";

import "./src/database/models/associatons.js";

const app = express();
const server = createServer(app);

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
    server.listen(NODE_LOCAL_PORT, () => {
      console.log(`Server running on port ${NODE_LOCAL_PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
