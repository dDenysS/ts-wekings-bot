import async from 'async'

import { Bot, Gift } from '../../database/models'
import WeCurses from '../bot/Curses'

import { IOptions, IBot } from './interface'

export default async function startCurses(): Promise<void> {
    const bots: IBot[] = await Bot.query()
        .where({is_bot_on: true})
        .eager('options')
        .modifyEager('options', builder => {
            return builder.where({is_gifts_on: true})
        })

    async.mapLimit(bots, 5, async item => {
        const {curses}: IOptions = item.options

        const Curses = new WeCurses({
            wkSession: item.wkSession,
            rememberToken: item.rememberToken
        })
        const state = await Curses.initLoadData()
        if (!state) {
            return console.dir('state curses', state, item)//do smt
        }

        async.mapLimit(curses, 5, async item => {
            await Curses.send(item.urlName, item.userId)
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
