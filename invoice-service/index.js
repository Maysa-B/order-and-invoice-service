const express = require('express')
const cors = require('cors')
const { consumePayment } = require('./helpers/kafka')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors({ origin: true, credentials: true, maxAge: 7 * 24 * 3600 }))

consumePayment()

app.listen(4003, () => console.log("Invoice Service running on port 4003"));