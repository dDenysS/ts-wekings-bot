const giftsStart = require('../../../services/cron/Gifts').default
const cursesStart = require('../../../services/cron/Curses').default

module.exports = {
    async forceStart(ctx) {
        await giftsStart()
        await cursesStart()
        ctx.status = 204
    }
}
