const session = require('koa-session')

module.exports = app => {
    app.secretKey = ['secret-key']
    app.use(session({
    }, app))
}
