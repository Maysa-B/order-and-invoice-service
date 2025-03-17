const { validateToken } = require('../helpers/jwt')

const paths = []

module.exports = async (req, res, next) => {
    if (paths.includes(req.path)) return next()

    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) return res.status(401).json({ message: 'Token not found' })

    const result = await validateToken(token)

    if (result.type === 401) {
        return res.status(401).json({ message: 'Expired or invalid token' })
    }

    req.user = result
    next()
}