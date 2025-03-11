const express = require('express')
const passport = require('passport')
const session = require('express-session')
const db = require('./database/queries/index')
require('./middleware/passport')
require('dotenv').config()

const { SESSION_SECRET } = process.env

const app = express()

app.use(express.json())
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    req.db = db

    next()
})

app.use('/', require('./router/auth'))

app.listen(4000, () => console.log("Login Service running on port 4000"));