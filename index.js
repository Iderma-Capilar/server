const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { createServer } = require("http");
const { createServer: createHttpsServer } = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const compression = require("compression");

const { NODE_LOCAL_PORT, NODE_LOCAL_HTTPS_PORT } = process.env;
const routes = require("./src/routes/index");
const { sequelize } = require("./src/utils/index");

const app = express();
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

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database");

    httpServer.listen(NODE_LOCAL_PORT, () => {
      console.log(`HTTP Server running on port ${NODE_LOCAL_PORT}`);
    });

    httpsServer.listen(NODE_LOCAL_HTTPS_PORT, () => {
      console.log(`HTTPS Server running on port ${NODE_LOCAL_HTTPS_PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
