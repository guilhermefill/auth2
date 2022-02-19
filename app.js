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
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, "public")));
// Last, but not least, we will have to define the routes in the app.js file. We will mount our authentication routes on the / path.
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// ROUTERS

const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use('/auth', authRoutes);

// Set up server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

module.exports = app;
