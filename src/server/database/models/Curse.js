const GlobalOptions = require('./GlobalOptions')

class Curse extends GlobalOptions {
    static get tableName() {
        return 'curses'
    }
}

module.exports = Curse
