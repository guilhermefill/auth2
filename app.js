require('dotenv').config();

// set and initialize express

const express = require('express');
const path = require('path');
const hbs = require('hbs')

const app = express();

// init database

const mongoConnection = require('./db/db.config')
mongoConnection();


// Set the view engine to HBS and tell the app where to find those views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Last, but not least, we will have to define the routes in the app.js file. We will mount our authentication routes on the / path.

// ROUTERS

const index = require("./routes/index.routes.js");
app.use("/", index);

app.use(function (req, res, next) {
  res.status(404).render("404");
});

// Set up server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

module.exports = app;
