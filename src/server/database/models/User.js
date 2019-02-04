const { Model} = require('objection')
const GlobalOptions = require('./GlobalOptions')

class User extends GlobalOptions {
    static get tableName() {
        return 'users'
    }
}

module.exports = User
