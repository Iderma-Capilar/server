import dotenv from "dotenv";
dotenv.config(); // Mover esto al principio

import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createServer } from "http";
import bodyParser from "body-parser";
const { NODE_LOCAL_PORT } = process.env;
import routes from "./src/routes/index.js";
import { connectToDatabase } from "./src/database/index.js";

import "./src/database/models/associations.js";

const app = express();
const server = createServer(app);

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

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
