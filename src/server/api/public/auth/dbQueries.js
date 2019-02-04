const {User} = require('../../../database/models/index')
const {cryptoPassword} = require('../../../untils/password')

class Queries {
    static async createUser(body) {
        const passwordHash = cryptoPassword(body.password)

        await User.query().insert({
            email: body.email,
            passwordHash
        })
    }
}

module.exports = Queries
