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

const consumeSuccess = async () => {
    const consumer = kafka.consumer({ groupId: 'invoice-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'payment.success', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const data = JSON.parse(message.value.toString() || {})
            const number = generateInvoice()
            console.log('INVOICE NUMBER', number)

            const result = await db.invoices.insert({ number, order_id: data.id })
            console.log('RESULT', result)
            
            const result2 = await db.orders.update({ status: 'finalized' }, data.id)
            console.log('RESULT2', result2)

            await invoiceGenerated(data)
        },
    })
}

const consumeError = async () => {
    const consumer = kafka.consumer({ groupId: 'invoice-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'payment.failed', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const data = JSON.parse(message.value.toString() || {})
            
            await db.orders.update({ status: 'canceled' }, data.id)
        },
    })
}

module.exports = { consumeSuccess, consumeError }