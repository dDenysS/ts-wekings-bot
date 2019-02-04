const Router = require('koa-router')
const router = new Router()
const fs = require('fs')

router.get('*', async ctx => {
    ctx.type = 'html'
    ctx.body = fs.createReadStream(`${distFolder}/index.html`)
})

module.exports = router
