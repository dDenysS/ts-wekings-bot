const {Bot, Gift} = require('../../database/models')
const {WeGift} = require('../bot')

async function init() {
    const bots = await Bot.query().eager('options').where({is_bot_on: true})
    const promises = bots.map(async item => {
        const {gifts} = item.options
        const Bot = new WeGift({
            wkSession: item.wkSession,
            rememberToken: item.rememberToken
        })
        return await sendGifts(Bot, gifts)
    })
    return await Promise.all(promises)
}

init().then(() => {
    console.log('Done')
}).catch(e => {
    console.log(e)
})

async function sendGifts(Bot, gifts) {
    const promises = gifts.map(async item => {
        const {urlName} = await Gift.query().findById(item.giftId)
        return await Bot.send(urlName, item.userId)
    })
    return await Promise.all(promises)
}
