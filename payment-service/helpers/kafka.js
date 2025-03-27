const { Kafka } = require('kafkajs')
const db = require('../database/queries/index')

const kafka = new Kafka({
    clientId: 'payment-service',
    brokers: ['kafka:9092']
})

const producer = kafka.producer()

const orderReadyToPay = async (data) => {
    await producer.connect()
    await producer.send({
        topic: 'payment.pending',
        messages: [{ value: JSON.stringify(data) }]
    })
}

const payOrder = async (success, data) => {
    const topic = success ? 'payment.success' : 'payment.failed'

    await producer.connect()
    await producer.send({
        topic,
        messages: [{ value: JSON.stringify(data) }]
    })
}

const createConsumer = async () => {
    const consumer = kafka.consumer({ groupId: 'payment-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'order.placed', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const data = JSON.parse(message.value.toString() || {})
            await db.orders.update({ payment_status: 'pending', status: 'payment pending' }, data.id)

            await orderReadyToPay(data)
        },
    })
}

module.exports = { payOrder, createConsumer }