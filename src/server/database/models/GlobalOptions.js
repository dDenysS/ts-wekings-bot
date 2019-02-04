const {snakeCaseMappers} = require('objection')
const Model = require('../index')

class GlobalOptions extends Model {
    static get columnNameMappers() {
        return snakeCaseMappers()
    }
}

module.exports = GlobalOptions
