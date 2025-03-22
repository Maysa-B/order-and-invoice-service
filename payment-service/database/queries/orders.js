const db = require('../client')

module.exports = {
    update: (data, id) => db.from('orders').update(data).eq('id', id)
}