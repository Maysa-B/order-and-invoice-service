const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'order-service',
    brokers: ['kafka:9092']
})

const producer = kafka.producer()

const createOrder = async (data) => {
    await producer.connect()
    await producer.send({
        topic: 'order.placed',
        messages: [{ value: JSON.stringify(data) }]
    })
}

module.exports = { createOrder }