const db = require('../client')

module.exports = {
    list: (user_id) => db.from('orders').select().eq('user_id', user_id),
    get: (id) => db.from('orders').select().eq('id', id),
    insert: (data) => db.from('orders').insert(data).select()
}