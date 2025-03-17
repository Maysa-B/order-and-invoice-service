const express = require('express')

const router = express.Router()

router.get('/', async (req, res, next) => {
    const { data: orders } = await req.db.orders.list(req.user.id)

    res.json(orders)
})

module.exports = router
