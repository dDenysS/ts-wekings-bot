const crypto = require('crypto')
const config = require('../../config')

//const salt = crypto.randomBytes(config.crypto.hash.length).toString('base64');
const salt = 'ZNUX0epuaSyvq/8xWrO+kptp+JE7pDV0TFb6OQn0jtYwmVASMS09k927dlJzY3G1JrptcSoSOjstU4XJs2DT24r/vmLO4yka9BIMNXZSZFfs05e2h5Wel78avfNnOcygIQEUEyfvVSfpICArIotxZWZMZQzrxnjMfxODOeUZNTw='

module.exports = {
    cryptoPassword(password) {
        return crypto.pbkdf2Sync(password, salt, config.crypto.hash.iterations, config.crypto.hash.length, 'sha512').toString('hex')
    },

    checkPassword(password,hashPassword) {
        return crypto
            .pbkdf2Sync(password, salt, config.crypto.hash.iterations, config.crypto.hash.length, 'sha512')
            .toString('hex') === hashPassword
    }
}
