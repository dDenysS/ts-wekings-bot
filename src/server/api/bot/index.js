const Router = require('koa-router')
const router = new Router({
    prefix: '/bots'
})
const controller = require('./controller')
const isAuthenticated = require('../../middlewares/isAuthenticated')
const validator = require('../../middlewares/validator')
const {idParam} = require('../../untils/validationSchemes')

router.use(isAuthenticated)

router.get('/', controller.getBots)
router.get('/captcha', controller.getCaptcha)
router.get('/sync/:id', validator(idParam, 'params'), controller.syncAcc)
router.post('/add', controller.addBot)

router.delete('/:id', validator(idParam, 'params'), controller.deleteBot)

module.exports = router
