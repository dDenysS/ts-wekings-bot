const Router = require('koa-router')
const router = new Router({
    prefix: '/api'
})

const admin = require('./admin')
const bot = require('./bot')
const options = require('./options')
const publicRoutes = require('./public')

router.use(publicRoutes.routes())
router.use(admin.routes())
router.use(bot.routes())
router.use(options.routes())

module.exports = router
