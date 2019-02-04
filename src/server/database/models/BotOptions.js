const GlobalOptions = require('./GlobalOptions')

class Bot extends GlobalOptions {
    static get tableName() {
        return 'bots_options'
    }
}

module.exports = Bot
