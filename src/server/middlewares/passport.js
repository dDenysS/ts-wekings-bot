const passport = require('koa-passport')
module.exports = app => {
    app.keys = ['secret', 'key']
    app.use(passport.initialize())
    app.use(passport.session())
}
