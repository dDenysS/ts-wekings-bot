const Cookie = require('cookie')

module.exports.parseCookies = cookieArrays => {
    const cookie = {}
    cookieArrays.forEach(item => {
        const result = Cookie.parse(item)
        const key = Object.keys(result)[0]
        cookie[key] = result[key]
    })

    return cookie
}
