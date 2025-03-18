const db = require('../client')

module.exports = {
    find: (google_id) => db.from('users').select().eq('google_id', google_id),
    findByEmail: (email) => db.from('users').select().eq('email', email || '').neq('password', null),
    insert: (body) => db.from('users').insert(body).select()
}