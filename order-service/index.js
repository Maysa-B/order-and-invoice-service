const express = require('express')
const cors = require('cors')
const db = require('./database/queries/index')
const jwtMiddleware = require('./middleware/jwt')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors({ origin: true, credentials: true, maxAge: 7 * 24 * 3600 }))
app.use((req, res, next) => {
    req.db = db

    next()
})

app.use(jwtMiddleware)

app.use('/orders', require('./router/orders'))

app.listen(4001, () => console.log("Order Service running on port 4001"));