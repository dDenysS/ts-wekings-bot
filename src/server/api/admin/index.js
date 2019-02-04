const Router = require('koa-router')
const router = new Router({
    prefix: '/admin'
})

const users= require('./users')

router.use(users.routes())

module.exports = router
