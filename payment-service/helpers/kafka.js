const { Kafka } = require('kafkajs')

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

const payOrder = async (data) => {
    // set when success
    const success = true ? 'payment.success' : 'payment.failed'

    await producer.connect()
    await producer.send({
        topic: success,
        messages: [{ value: JSON.stringify(data) }]
    })
}

const createConsumer = async () => {
    const consumer = kafka.consumer({ groupId: 'payment-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'order.placed', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // set payment_status as pending
            // orderReadyToPay
            console.log(topic)
            console.log(partition)
            console.log(JSON.parse(message.value.toString()) || {})
        },
    })
}

module.exports = { payOrder, createConsumer }