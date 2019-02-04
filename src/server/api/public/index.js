const Router = require('koa-router')
const router = new Router({
    prefix: '/public'
})

const auth = require('./auth')

router.use(auth.routes())

module.exports = router
