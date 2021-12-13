const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//router
const router = require("./routes");

//routing
app.use("/", router);

//errorHandler
app.use((err, req, res, next) => {
  //   res.locals.message = err.message;
  //   res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  console.error(err);
  res.status(err.status || 500).send(err.message);
});

module.exports = app;
