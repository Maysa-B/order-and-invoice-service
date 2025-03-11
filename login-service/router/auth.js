const express = require('express')
const passport = require('passport')
const { generateToken } = require('../helpers/jwt')

const router = express.Router()

router.get('/login', passport.authenticate("google"))

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

    res.redirect('http://localhost:3000/')
})

module.exports = router
