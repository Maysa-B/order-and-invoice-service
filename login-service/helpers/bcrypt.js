const bcrypt = require('bcrypt')

const rounds = 10

const hash = (password) => bcrypt.hash(password, rounds)

const compare = (password, passwordHash) => bcrypt.compare(password, passwordHash)

module.exports = { hash, compare }