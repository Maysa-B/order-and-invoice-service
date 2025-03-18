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

const createConsumer = async () => {
    const consumer = kafka.consumer({ groupId: 'invoice-group' })
    
    await consumer.connect()
    await consumer.subscribe({ topic: 'order.placed', fromBeginning: true })
    
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(topic)
        console.log(partition)
        console.log(JSON.parse(message.value.toString()) || {})
      },
    })
}

createConsumer()

module.exports = { createOrder }