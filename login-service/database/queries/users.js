const db = require('../client')

module.exports = {
    find: (google_id) => db.from('users').select().eq('google_id', google_id),
    insert: (google_id, name, email) => db.from('users').insert({ google_id, name, email }).select()
}