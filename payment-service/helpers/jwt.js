require('dotenv').config()
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env

const generateToken = (payload) => jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256', expiresIn: '24h' })

const validateToken = async (token) => {
    try {
        const result = jwt.verify(token, JWT_SECRET)

        return result
    } catch (err) {
        return { type: 401 }
    }
}

module.exports = { generateToken, validateToken }