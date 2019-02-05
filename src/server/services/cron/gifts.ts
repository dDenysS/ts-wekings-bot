import async from 'async'

import { Bot, Gift } from '../../database/models'
import WeGift from '../bot/Gifts'

import { IOptions, IBot } from './interface'

export default async function startGifts(): Promise<void> {
    const bots: IBot[] = await Bot.query()
        .where({is_bot_on: true})
        .eager('options')
        .modifyEager('options', builder => {
            return builder.where({is_gifts_on: true})
        })

    async.mapLimit(bots, 5, async item => {
        const {gifts}: IOptions = item.options

        const Gifts = new WeGift({
            wkSession: item.wkSession,
            rememberToken: item.rememberToken
        })
        const state = await Gifts.initLoadData()
        if (!state) {
            return console.dir('state', state, item)//do smt
        }

        async.mapLimit(gifts, 5, async item => {
            console.log(item.urlName)
            await Gifts.send(item.urlName, item.userId)
        }, err => {
            if (err) handlerError(err)
        })
    }, err => {
        if (err) handlerError(err)
    })
}

function handlerError(err: Error): void {
    console.error(err.message)
    // do smth
}
