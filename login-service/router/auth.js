const express = require('express')
const passport = require('passport')
const { generateToken } = require('../helpers/jwt')
const { hash, compare } = require('../helpers/bcrypt')

const router = express.Router()

router.post('/login', async (req, res, next) => {
    // validations

    const { data: user, error} = await req.db.users.findByEmail(req.body.email)

    if (!user || user?.length < 1) return res.status(404).json({ message: 'User not found' })
    
    const compareResult = await compare(req.body.password, user[0].password)

    if (!compareResult) return res.status(401).json({ message: 'Wrong password' })

    delete user[0].password
    res.json({ user: user[0], token: generateToken(user[0]) })
})

router.post('/register', async (req, res) => {
    // check for duplicates
    // validations

    const data = { ...req.body, password: await hash(req.body.password)}
    delete data.password_confirm

    const { data: user } = await req.db.users.insert(data)
    delete user[0].password

    res.json({ user: user[0], token: generateToken(user[0]) })
})

router.get('/auth/google', passport.authenticate("google"))

router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/logout'
}), (req, res, next) => {
    res.cookie('user', JSON.stringify(req.user))
    res.cookie('token', JSON.stringify(generateToken(req.user)))
    res.redirect('http://localhost:3000/inside')
})

router.get('/logout', (req, res) => {
    req.logout()
    req.session.destroy()
    res.cookie('user', null)
    res.cookie('token', null)
    res.json({})
})

module.exports = router
