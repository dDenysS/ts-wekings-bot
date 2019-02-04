const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')

const app = new Koa()
const router = new Router()

const routes = require('./api')
const staticRoutes = require('./api/static')

require('./database')
require('./services/passport')

///middlewares
require('./middlewares/session')(app)
require('./middlewares/logger')(app)
require('./middlewares/bodyParser')(app)
require('./middlewares/cors')(app)
require('./middlewares/passport')(app)
require('./middlewares/helmet')(app)

app.use(serve(__dirname + '/modules/static/dist'))

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = {message: err.message}
        ctx.app.emit('error', err, ctx)
    }
})

app.use(routes.routes())
app.use(router.allowedMethods())
// app.use(staticRoutes.routes())


app.on('error', err => {
    console.log(err)
})

process.on('uncaughtException', function (err) {
    console.log(err)
})

app.listen(process.env.PORT || 7777)
