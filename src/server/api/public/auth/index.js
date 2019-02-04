const Router = require('koa-router')
const router = new Router({
    prefix: '/auth'
})

const controller = require('./controller')

const validator = require('../../../middlewares/validator')
const {registration,login} = require('./validationScheme')

router.get('/status', controller.getStatus)
router.get('/logout', controller.logout)

router.post('/login', validator(login, 'body'), controller.login)
router.post('/register', validator(registration, 'body'), controller.registration)

module.exports = router
