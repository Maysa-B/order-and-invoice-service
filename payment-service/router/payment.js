const express = require('express')
const kafka = require('../helpers/kafka')

const router = express.Router()

router.post('/:id', async (req, res, next) => {
    const paymentApproved = Math.random() > 0.2; // Simulação (80% de sucesso)
    
    await req.db.orders.update({ payment_status: paymentApproved ? 'success' : 'failed' }, req.params.id)

    await kafka.payOrder(paymentApproved, { id: req.params.id })

    res.json({})
})

module.exports = router
