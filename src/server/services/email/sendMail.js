const nodemailer = require('nodemailer')
const {templateBuilder} = require('./templateBuilder')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'master051294@gmail.com',
        pass: '546ryfgfgfWRBbb55333'
    }
})

const confirmEmail = email => {
    return new Promise((res, rej) => {
        const payload = {
            email,
            time: new Date()
        }
        const token = 'token'
        templateBuilder('confirmEmail', `http://localhost:1111/verify/email?id=${token}`)
            .then(template => {
                let mailOptions = {
                    from: 'master051294@gmail.com', // sender address
                    to: 'master051294@gmail.com', // list of receivers
                    subject: 'Активация аккаунта', // Subject line
                    html: template
                }

                transporter.sendMail(mailOptions)
                    .then(info => {
                        res(info)
                    }).catch(rej)


            }).catch(rej)
    })
}

const resetPassword = email => {
    return new Promise((res, rej) => {
        const token = 'token'
        templateBuilder('resetPassword', `http://localhost:1111/verify/email?id=${token}`)
            .then(template => {
                let mailOptions = {
                    from: 'master051294@gmail.com', // sender address
                    to: 'master051294@gmail.com', // list of receivers
                    subject: 'Восстановление пароля', // Subject line
                    html: template
                }

                transporter.sendMail(mailOptions)
                    .then(info => {
                        res(info)
                    })
                    .catch(rej)

            }).catch(rej)
    })
}

module.exports = {
    confirmEmail,
    resetPassword
}


