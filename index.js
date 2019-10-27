require("dotenv").config();

const history = require("connect-history-api-fallback");
const logger = require("./logger");
const express = require("express");
const path = require("path");
const http = require("http");

const IS_PROD = process.env.NODE_ENV === "production";
const FORCE_SSL = process.env.FORCE_SSL === "true";

IS_PROD
  ? logger.info("Running production server!")
  : logger.info("Running development server!");

// Path to static files
const BUNDLE_DIR = path.join(__dirname, "./bundle");

// Express server
const app = express();
const port = process.env.PORT || 3000;

// HTTP server
const server = http.createServer(app);

// HTTPS redirect
if (IS_PROD) {
  if (FORCE_SSL) {
    app.enable("trust proxy");
    app.use((req, res, next) => {
      if (req.secure) {
        next();
      } else {
        res.redirect(`https://${req.headers.host}${req.url}`);
      }
    });
  }
}

// Fallback if required
app.use(history());

// Static files
app.use(express.static(BUNDLE_DIR));

// Start listening!
server.listen(port, () => {
  logger.info(`StayHealthy Internal is running on port ${port}!`);
});
