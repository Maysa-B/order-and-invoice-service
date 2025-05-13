const { Kafka } = require('kafkajs')
const db = require('../database/queries/index')

const kafka = new Kafka({
    clientId: 'invoice-service',
    brokers: ['kafka:9092']
})

const producer = kafka.producer()

const generateInvoice = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}


const invoiceGenerated = async (data) => {
    await producer.connect()
    await producer.send({
        topic: 'invoice.generated',
        messages: [{ value: JSON.stringify(data) }]
    })
}

const consumePayment = async () => {
    const consumer = kafka.consumer({ groupId: 'invoice-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'payment.success', fromBeginning: true })
    await consumer.subscribe({ topic: 'payment.failed', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, message }) => {
            const data = JSON.parse(message.value.toString())

            if (topic === 'payment.success') {
                const number = generateInvoice()
                await db.invoices.insert({ number, order_id: data.id })
                await db.orders.update({ status: 'finalized' }, data.id)
                await invoiceGenerated(data)
            }

            if (topic === 'payment.failed') {
                await db.orders.update({ status: 'canceled' }, data.id)
            }
        },
    })
}

module.exports = { consumePayment }