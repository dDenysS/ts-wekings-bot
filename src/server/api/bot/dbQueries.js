const {transaction} = require('objection')
const {Bot, BotOptions} = require('../../database/models')
const knex = Bot.knex()

class Queries {
    static async getBots(idUser) {
        return await Bot.query().where({user_id: idUser})
    }

    static async getBot(id) {
        return await Bot.query().findById(id)
    }

    static async editBot(id, data) {
        return await Bot.query().findById(id)
            .update(data).returning('*')
    }

    static async addBot({cookie, user, botName, info}) {
        return await transaction(knex, async trx => {
            const bot = await Bot.query(trx)
                .insert({
                    name: botName,
                    userId: user.id,
                    wkSession: cookie['_wk_session'],
                    rememberToken: cookie['remember_token'],
                    ...info
                }).returning('*')
            await BotOptions.query(trx)
                .insert({
                    botId: bot.id
                })
            return bot
        })
    }

    static async deleteBot(id) {
        return await Bot.query().deleteById(id)
    }
}

module.exports = Queries
