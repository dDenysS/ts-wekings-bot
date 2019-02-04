const Router = require('koa-router')
const router = new Router({
    prefix: '/options'
})
const controller = require('./controller')
const isAuthenticated = require('../../middlewares/isAuthenticated')
const validator = require('../../middlewares/validator')
const {gifts, idBot, curses, mine} = require('./validationScheme')

router.use(isAuthenticated)

router.get('/gifts', controller.getGifts)

router.get('/gifts/:idBot',
    validator(idBot, 'params'),
    controller.getGiftBot)

router.put('/gifts/:idBot',
    validator(idBot, 'params'),
    validator(gifts, 'body'),
    controller.editGiftBot)


router.get('/curses', controller.getCurses)

router.get('/curses/:idBot',
    validator(idBot, 'params'),
    controller.getCurseBot)

router.put('/curses/:idBot',
    validator(idBot, 'params'),
    validator(curses, 'body'),
    controller.editCurseBot)

router.get('/mine/:idBot',
    validator(idBot, 'params'),
    controller.getChanceToMine)

router.put('/mine/:idBot',
    validator(idBot, 'params'),
    validator(mine, 'body'),
    controller.editChanceToMine)

module.exports = router
