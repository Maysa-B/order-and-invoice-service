const express = require('express')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const db = require('./database/queries/index')
const jwtMiddleware = require('./middleware/jwt')
require('./middleware/passport')
require('dotenv').config()

const { SESSION_SECRET } = process.env

const app = express()

app.use(express.json())
app.use(cors({ origin: true, credentials: true, maxAge: 7 * 24 * 3600 }))
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    req.db = db

    next()
})

app.use(jwtMiddleware)

app.use('/', require('./router/auth'))
app.use('/closed', (req, res, next) => {
    res.json('passouuuu')
})

app.listen(4000, () => console.log("Auth Service running on port 4000"));