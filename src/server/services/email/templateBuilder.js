const path = require('path')
const ejs = require('ejs')

let templates = {
    resetPassword: path.join(__dirname,'views','resetPassword.ejs'),
    confirmEmail: path.join(__dirname,'views','confirmEmail.ejs'),
}


module.exports.templateBuilder = (tplName, link) => {
    return new Promise((resolve, reject) => {
        ejs.renderFile(templates[tplName], {link}, (err, html) => {
            if (err) {
                console.error(err)
                return reject(err)
            }
            resolve(html)
        })
    })
}



