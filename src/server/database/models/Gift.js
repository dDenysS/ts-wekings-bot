const {snakeCaseMappers} = require('objection')
const GlobalOptions = require('./GlobalOptions')

class Gift extends GlobalOptions {
    static get tableName() {
        return 'gifts'
    }

    static get columnNameMappers() {
        return snakeCaseMappers()
    }
}

module.exports = Gift
