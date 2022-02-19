require('dotenv').config();

// set and initialize express

const express = require('express');
const path = require('path');
const hbs = require('hbs')

const app = express();
const session = require('express-session');

const MongoStore = require('connect-mongo');

const isLoggedIn = (req, res, next) => {
    if(!req.session.currentUser) {
        res.redirect('/login');
    } else {
        next();
    }
};

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

app.use(session({
    secret: 'keyboardcat',
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 60 * 60 * 24
    })
}));
// ROUTERS

const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use('/auth', authRoutes);

// Set up server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

module.exports = app;
