// imports modules & dependencies
const express = require("express");
const env = require("dotenv");
const favicon = require("serve-favicon");
var path = require("path");
var cors = require("cors");
const passport = require("passport");
// imports routes, middleware, and configs
const routes = require("./src/routes");
const { notFoundRoute, errorHandler } = require("./src/configs/errorHandler");

// import fileUpload
const fileUpload = require("express-fileupload");

// loads environment variables from .env file
env.config();

// initializes express app
const app = express();
const server = require("http").createServer(app);

// application database connection establishment
const connectDatabase = require("./src/db/connect");
connectDatabase();

// corss-origin-allow-all
app.use(cors());

// sets favicon in routes
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// sets static folder
app.use(express.static(path.join(__dirname, "public")));

app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // or specify your origin
  next();
}, express.static(path.join(__dirname, 'uploads')));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(
  fileUpload({
    limits: { fileSize: 3 * 1024 * 1024 },
  })
);

require("./src/configs/passport")(passport);

// sets default route
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to App Node.js application backend." });
});

// api routes
app.use("/api", routes);

// 404 - not found error handler
app.use(notFoundRoute);

// error handler
app.use(errorHandler);

const authCtr = require("./src/controllers/authController");
authCtr.defaultAdmin();

// app listens to defined port
server.listen(process.env.APP_PORT, () => {
  console.log(
    `Our Team-App backend server running on:  + ${process.env.APP_PORT}`
  );
});

// const socketApp = require('./socketApp');
// socketApp.socketServer(server)
