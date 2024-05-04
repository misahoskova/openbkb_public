const express = require("express");
const app = express();
// const morgan = require('morgan');
const fs = require("fs");

// const bodyParser = require('body-parser');
const api = require("./api/api");
const web = require("./api/web");
const error = require("./api/error");
app.use("/api", api);
app.use("/", web);
app.use("/", error);

module.exports = app;