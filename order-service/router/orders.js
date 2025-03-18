const express = require('express')
const kafka = require('../helpers/kafka')

const router = express.Router()

router.get('/', async (req, res, next) => {
    const { data: orders } = await req.db.orders.list(req.user.id)

    res.json(orders)
})

router.post('/', async (req, res, next) => {
    const { data } = await req.db.orders.insert({...req.body, user_id: req.user.id})

    await kafka.createOrder(data[0])

    res.json({})
})

module.exports = router
