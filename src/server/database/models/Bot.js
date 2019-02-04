const {Model} = require('objection')
const GlobalOptions = require('./GlobalOptions')

class Bot extends GlobalOptions {
    static get tableName() {
        return 'bots'
    }

    static get relationMappings() {
        return {
            options: {
                relation: Model.HasOneRelation,
                modelClass: `${__dirname}/BotOptions`,
                join: {
                    from: 'bots.id',
                    to: 'bots_options.bot_id'
                }
            }
        }
    }
}

module.exports = Bot
