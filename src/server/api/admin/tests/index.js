const Router = require('koa-router')
const router = new Router({
    prefix: '/tests'
})
const controller = require('./controller')

router.get('/force', controller.forceStart)

module.exports = router

