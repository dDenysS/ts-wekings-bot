const Router = require('koa-router')
const router = new Router({
    prefix: '/users'
})
const controller = require('./controller')
const validator = require('../../../middlewares/validator')
const {paginate} = require('../../../untils/validationSchemes')

router.get('/', validator(paginate,'query'),  controller.getUsers)


module.exports = router
