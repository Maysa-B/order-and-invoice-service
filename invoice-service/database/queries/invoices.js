const db = require('../client')

module.exports = {
    insert: (data) => db.from('invoices').insert(data)
}