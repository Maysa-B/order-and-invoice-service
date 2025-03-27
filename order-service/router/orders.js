const express = require('express')
const kafka = require('../helpers/kafka')
const dayjs = require('dayjs')

const router = express.Router()

router.get('/', async (req, res, next) => {
    const { data: orders } = await req.db.orders.list(req.user.id)

    res.json(orders.map(o => ({ ...o, created_at: dayjs(o.created_at).format('DD/MM/YYYY HH:mm:ss') })))
})

router.get('/:id', async (req, res, next) => {
    const { data: order } = await req.db.orders.get(req.params.id)

    res.json({ ...order[0], created_at: dayjs(order[0].created_at).format('DD/MM/YYYY HH:mm:ss') })
})

router.post('/', async (req, res, next) => {
    const { data } = await req.db.orders.insert({ ...req.body, user_id: req.user.id, status: 'created' })

    await kafka.createOrder(data[0])

    res.json({})
})

module.exports = router
