const {BotOptions, Gift, Curse} = require('../../database/models')

class Queries {
    static async getGifts() {
        return await Gift.query()
    }

    static async getGiftBot(botId) {
        return await BotOptions.query()
            .select('gifts', 'is_gifts_on')
            .where({bot_id: botId})
            .first()
    }

    static async editGiftBot(botId, body) {
        await BotOptions.query()
            .update({
                isGiftsOn: body.status,
                gifts: JSON.stringify(body.gifts)
            }).where({bot_id: botId})
    }

    static async getCurses() {
        return await Curse.query()
    }

    static async getCurseBot(botId) {
        return await BotOptions.query()
            .select('curses', 'is_curses_on')
            .where({bot_id: botId})
            .first()
    }

    static async editCurseBot(botId, body) {
        return await BotOptions.query()
            .update({
                isCursesOn: body.status,
                curses: JSON.stringify(body.curses)})
            .where({bot_id: botId})
    }

    static async getChanceToMine(botId) {
        return await BotOptions.query()
            .select('chance_to_mine','is_mine_on')
            .where({bot_id: botId})
            .first()
    }

    static async editChanceToMine(botId, body) {
        return await BotOptions.query()
            .update({
                isMineOn: body.status,
                chanceToMine: body.chanceToMine
            })
            .where({bot_id: botId})
    }
}

module.exports = Queries
