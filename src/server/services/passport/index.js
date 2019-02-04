const passport = require('koa-passport')
const LocalStrategy = require('passport-local')

const {User} = require('../../database/models')

const {checkPassword} = require('../authPassword')


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.query()
        .findById(id)
        .then(user => {
            if (!user) return done(null, false)
            done(null, user)
        })
        .catch(err => {
            done(err, null)
        })
})

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
},
(req, email, password, done) => {
    User.query()
        .where({
            email,
        })
        .first()
        .then(user => {
            if (!user) return done(null, false)

            if (checkPassword(password, user.passwordHash)) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
}
))

