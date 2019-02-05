const Router = require('koa-router')
const router = new Router({
    prefix: '/admin'
})

const users = require('./users')
const tests = require('./tests')

router.use(users.routes())
router.use(tests.routes())

module.exports = router
