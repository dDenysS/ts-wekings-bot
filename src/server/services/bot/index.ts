import { Cookie } from 'tough-cookie'
import { RequestResponse } from 'request'


const cheerio = require('cheerio')
const login = require('./login')
const rp = require('request-promise')
const tough = require('tough-cookie')
const cookie = tough.Cookie

interface IAccess {
    rememberToken: string,
    wkSession: string
}

interface IReqTransform {
    statusCode: number,
    $: CheerioStatic,
    headers: any,
    cookie: Cookie
}

interface IReqOptions {
    uri: string,
    method: string,
    resolveWithFullResponse: boolean,

    transform(body: any, response: RequestResponse): IReqTransform

    headers: {
        cookie: string
    }
}

class WeBot {
    public readonly rememberToken: string
    public readonly wkSession: string
    public resp: IReqTransform

    public constructor({rememberToken, wkSession}: IAccess) {
        this.wkSession = wkSession
        this.rememberToken = rememberToken
    }

    public async loadData(url: string, method: string = 'GET'): Promise<Cheerio> {
        const options: IReqOptions = {
            uri: url,
            method,
            resolveWithFullResponse: true,
            transform: this.requestTransform,
            headers: {
                cookie: cookie.serialize('_wk_session', this.wkSession) + '; ' +
                    cookie.serialize('remember_token', this.rememberToken)
            }
        }
        return this.resp = await rp(options)

    }

    private requestTransform = (body: any, response: RequestResponse): IReqTransform => {
        const $: CheerioStatic = cheerio.load(body, {decodeEntities: false})

        console.log('requestTransform cookie', response.headers['set-cookie'])
        console.log('parse cookie', cookie.parse(response.headers['set-cookie'] as any))
        console.log('1:notify', $('.info .notifications_block:first-child .notice td:last-child').text())
        console.log('1:notify', $('.info .notifications_block').html())
        return {
            statusCode: response.statusCode,
            $,
            headers: response.headers,
            cookie: cookie.parse(response.headers['set-cookie'] as any)
        }
    }
}

class WeInfo extends WeBot {
    public constructor({rememberToken, wkSession}: IAccess) {
        super({rememberToken, wkSession})
    }

    public async isExistItem(name: string): Promise<boolean> {
        const $: CheerioStatic = this.resp.$
        let exist: boolean = false

        await this.loadData('http://wekings.ru/game/inventories')

        this.resp.$('.page_game_inventories_user .block')
            .each(function (index: number, item: CheerioElement) {
                if (~$(this).html().search(name)) {
                    exist = true
                }
            })
        return exist
    }

    public async isFreeSpace(): Promise<boolean> {
        await this.loadData('http://wekings.ru/game/inventories')
        const strSpace: string = this.resp.$('.page_game_inventories_user div.block:nth-child(2)').html().trim()
        const currSpace: number = Number(/\d{1,2}/g.exec(strSpace)[0])
        const allSpace: number = Number(/\d{1,2}/g.exec(strSpace)[0])
        if (!currSpace || !allSpace) {
            throw new Error(`currSpace:${currSpace} allSpace${allSpace}. Load data. Load needed page`)
        }
        return currSpace < allSpace
    }

    public get level(): string {
        return this.resp.$('#current_user_level').text()
    }

    public get healthy(): string {
        return this.resp.$('#current_user_health').text()
    }

    public get silver(): string {
        return this.resp.$('#user_silver_amount').text()
    }

    public get crystal(): string {
        return this.resp.$('#user_crystal_amount').text()
    }

    public get gold(): string {
        return this.resp.$('#user_gold_amount').text()
    }

    public get fights(): string {
        return this.resp.$('#remaining_fights_count').text().split('/')[0]
    }
}

class WeGift extends WeInfo {
    private readonly type: string

    public constructor({rememberToken, wkSession}: IAccess) {
        super({rememberToken, wkSession})
        this.type = 'gift'
    }

    public async buy(nameItem: string): Promise<void> {
        const url: string = WeGift.getUrlBuy(nameItem)
        await this.loadData(url)
        const buyUrl: string = this.resp.$('.page_game_confirm > .navigation > li:first-child > a')
            .attr('href')
        await this.loadData(buyUrl)
    }

    public async send(nameItem: string, idUser: number): Promise<void> {
        if (await this.isExistItem(nameItem) && await this.isFreeSpace()) {
            await this.buy(nameItem)
        }

        const url = `http://wekings.ru/game/presents/targets?item_key=${nameItem}&type=${this.type}`
        await this.loadData(url)
        const targetUrl = this.resp.$('.page_game_presents_targets > ul > li:first-child .links a').attr('href')

        const drid: string = new URL('http://wekings.ru' + targetUrl).searchParams.get('drid')

        const sendUrl = `http://wekings.ru/game/presents/give?item_key=${nameItem}&amp;` +
            `target_id=${idUser}&amp;type=${this.type}&amp;drid=${drid}`.replace(/&amp;/g, '&')
        await this.loadData(sendUrl)
    }

    private static getUrlBuy(nameItem: string): string {
        return `http://wekings.ru/game/
        confirm?back_url=/game/shop/dealers/gifts?
        page=1&icon=a_silver&key_part=9fee&
        text=купить Коробочка в количестве 1 за 100 серебра&url=
        /game/shop/dealers/gifts/buy?item=${nameItem}&page=1&quantity=1`
    }
}

class WeCurse extends WeGift {
    private readonly type: string

    constructor({rememberToken, wkSession}: IAccess) {
        super({rememberToken, wkSession})
        this.type = 'curse'
    }

    static getUrlBeforeBuy(nameItem) {
        return `http://wekings.ru/game/
        confirm?back_url=/game/shop/dealers/curses?page=2
        &icon=a_silver&key_part=9739&text=купить Отравленный пирог в количестве 1 за 3000
         серебра&url=/game/shop/dealers/curses/buy?item=${nameItem}&page=2&quantity=1`
    }
}


module.exports = {
    login,
    WeInfo: WeInfo,
    WeGift
}
const wkSession: string = 'BAh7CzoPc2Vzc2lvbl9pZEkiJWIyNWRkZmNkMTZjOWE4OGFlYmQzNmQ2YzY3NjFlZDhhBjoGRUY6E3NpbXBsZV9jYXB0Y2hhSSItZDZlZGZmYmY1ZDU3MWUwNWQ3NjE1MTA3YTBjYjI1ODMwYzc0NDE0YQY7BkY6DnJldHVybl90b0kiLGh0dHA6Ly93ZWtpbmdzLnJ1L3Zpc2l0b3IvcHJvY2Vzc19sb2dpbgY7BlRJIgpmbGFzaAY7BlRJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNoSGFzaHsGOgtub3RpY2VJIgAGOwZGBjoKQHVzZWR7BjsKRjoJdXNlcmkDLI4tOhlwYXJ0bmVyX3JlZmVyZW5jZV9pZGkC6Uw'
const rememberToken: string = '27ca0f7d99f3f622efb55515eea1c08d'
const Gifts = new WeGift({wkSession,rememberToken})

Gifts.send('box_gift', 1957999).then(()=>{
    console.log('done')
})
