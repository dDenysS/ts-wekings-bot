const rp = require('request-promise')
const cheerio = require('cheerio')
const Cookie = require('cookie')
const {parseCookies} = require('./untils')

function requestTransform() {
    return (body, response) => {
        return ({
            statusCode: response.statusCode,
            $: cheerio.load(body, {decodeEntities: false}),
            headers: response.headers,
            cookie: Cookie.parse(...response.headers['set-cookie'])
        })
    }
}

function downloadImageCaptcha(url, wkSession) {
    return new Promise((res, rej) => {
        const options = {
            url,
            encoding: 'binary',
            headers: {
                'cookie': Cookie.serialize('_wk_session', wkSession)
            }
        }

        rp(options, (err, response, body) => {
            if (err) return rej(err)
            res('data:' + response.headers['content-type'] + ';base64,' + new Buffer.from(body, 'binary').toString('base64'))
        })
    })
}

module.exports.loginSubmit = (body, wkSession) => {
    return new Promise((res, rej) => {
        const options = {
            method: 'POST',
            uri: 'http://wekings.ru/visitor/process_login',
            form: {
                user_name: body.username,
                user_password: body.password,
                captcha: Number(body.code),
                commit: 'Зайти'
            },
            transform: requestTransform(),
            resolveWithFullResponse: true,
            headers: {
                Cookie: Cookie.serialize('_wk_session', wkSession)
            }
        }
        rp(options).then(({$}) => {
            rej({
                status: 400,
                notify: $('.notifications_block .notice td:last-child').text().trim()
            })
        }).catch(err => {
            // успіх якщо сайт повернув 302
            // тому що він рекдиректить на аккаунт
            const {statusCode, $} = err.response

            if (statusCode === 302) {
                const cookie = parseCookies(err.response.headers['set-cookie'])
                return res({cookie, statusCode, $})
            } else {
                return rej({
                    notify: 'Неизвестная ошибка игрового сервера',
                    status: 500
                })
            }
        })
    })
}

module.exports.getCaptcha = async () => {
    const options = {
        uri: 'http://wekings.ru/visitor/process_login',
        method: 'GET',
        resolveWithFullResponse: true,
        transform: requestTransform(),
    }
    const {$, cookie} = await rp(options)
    const captchaUrl = $('.captcha_image > img').attr('src')
    const wkSession = cookie['_wk_session']

    const imgBase64 = await downloadImageCaptcha(captchaUrl, wkSession)

    return {
        img: imgBase64,
        wkSession
    }
}
