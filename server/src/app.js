// accessing environment variables
require("dotenv").config();
// accessing db connection
require("./utils/db").mongoDB();
const express = require("express"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  helmet = require("helmet"),
  http = require("http"),
  schedule = require("node-schedule"),
  userRouter = require("./routes/userRoutes").routes(),
  vehiclesRouter = require("./routes/vehicleRoutes").routes(),
  indexRouter = require("./routes/index"),
  { networkConfig } = require("./bin/www"),
  { errorHandler } = require("./middlewares/errorhandler"),
  app = express(),
  port = process.env.PORT || 5000,
  { mongoScheduler } = require("./utils/cronjob/mongoScheduler");

const passport = require("passport"),
  OAuth2Strategy = require("passport-oauth").OAuth2Strategy;

const open = require("open");
passport.use(
  "provider",
  new OAuth2Strategy(
    {
      authorizationURL: process.env.AUTHORIZATION_URL,
      tokenURL: process.env.TOKEN_URL,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      global.accessToken = accessToken;
      global.refreshToken = refreshToken;

      console.log("Access Token retrieved.");
    }
  )
);

// handling the scheduler time
schedule.scheduleJob(process.env.SCHEDULE_TIME, mongoScheduler);

app.get(
  "/auth/provider",
  passport.authenticate("provider", {
    scope: [
      "mb:vehicle:status:general",
      "mb:user:pool:reader",
      "offline_access",
    ],
  })
);

app.get(
  "/auth/provider/callback",
  passport.authenticate("provider", {
    scope: [
      "mb:vehicle:status:general",
      "mb:user:pool:reader",
      "offline_access",
    ],
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

// ------------------------- app configuration ------------------------- //

app.use(
  express.urlencoded({ extended: false }),
  express.json(),
  express.static("utils"),
  cookieParser(),
  // helmet for security purpose
  helmet(),
  // morgan middleware
  logger("dev"),

  // enable headers required for POST request
  networkConfig,
  // global error handler
  errorHandler,

  // --------- app routes --------------- //
  indexRouter,
  // user Login router
  userRouter,
  // vehicle details
  vehiclesRouter
);

// ------------------------- app configuration ends here ------------------------- //

http.createServer(app).listen(port, async () => {
  console.log(
    `Server is listening at port ${port} with ${process.env.NODE_ENV} Node Environment`
  );

  await open(process.env.AUTH_URL);
});
