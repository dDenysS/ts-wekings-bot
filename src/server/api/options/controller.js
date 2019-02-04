const dbQueries = require('./dbQueries')

module.exports = {
    async getGifts(ctx) {
        ctx.body = await dbQueries.getGifts()
    },

    async getGiftBot(ctx) {
        const {idBot} = ctx.valid.params
        ctx.body = await dbQueries.getGiftBot(idBot)
    },

    async editGiftBot(ctx) {
        const {idBot} = ctx.valid.params
        const {body} = ctx.valid

        await dbQueries.editGiftBot(idBot, body)
        ctx.status = 204
    },

    async getCurses(ctx) {
        ctx.body = await dbQueries.getCurses()
    },

    async getCurseBot(ctx) {
        const {idBot} = ctx.valid.params
        ctx.body = await dbQueries.getCurseBot(idBot)
    },

    async editCurseBot(ctx) {
        const {idBot} = ctx.valid.params
        const {body} = ctx.valid
        ctx.body = await dbQueries.editCurseBot(idBot, body)
    },

    async getChanceToMine(ctx) {
        const {idBot} = ctx.valid.params
        ctx.body = await dbQueries.getChanceToMine(idBot)
    },

    async editChanceToMine(ctx) {
        const {idBot} = ctx.valid.params
        const {body} = ctx.valid
        ctx.body = await dbQueries.editChanceToMine(idBot, body)
    }
}
