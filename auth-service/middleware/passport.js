require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')
const db = require('../database/queries/index')

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, LOGIN_SERVICE_URL } = process.env

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${LOGIN_SERVICE_URL}/auth/google/callback`,
    scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
}, async function (accessToken, refreshToken, profile, done) {
    const select = await db.users.find(profile.id)

    if (select?.data?.length < 1) {
        const { error, data } = await db.users.insert({
            google_id: profile.id, 
            name: profile.displayName, 
            email: profile.emails.find(email => email.verified)?.value
        })

        return done(error, data)
    }

    done(select.error, select.data[0])
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})