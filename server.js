// import all of the node modules we installed and need to run this app 
const mysql = require("mysql");
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// create an express application
const app = express();
var PORT = process.env.PORT || 3000;