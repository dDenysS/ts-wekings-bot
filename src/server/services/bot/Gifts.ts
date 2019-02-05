import { IAccess } from './interface'

import WeInfo from './Info'

export default class WeGift extends WeInfo {
    protected readonly type: string

    public constructor({rememberToken, wkSession}: IAccess) {
        super({rememberToken, wkSession})
        this.type = 'gift'
    }

    public async buy(nameItem: string): Promise<void> {
        const url: string = this.getUrlBuy(nameItem)
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
        const targetUrl: string = this.resp.$('.page_game_presents_targets > ul > li:first-child .links a').attr('href')
        // @ts-ignore
        const drid: string = new URL(`http://wekings.ru${targetUrl}`).searchParams.get('drid')
        const sendUrl = `http://wekings.ru/game/presents/give?item_key=${nameItem}&amp;` +
            `target_id=${idUser}&amp;type=${this.type}&amp;drid=${drid}`.replace(/&amp;/g, '&')
        try {
            await this.loadData(sendUrl)
        } catch (err) {
            if (err.response.statusCode === 302) {
                this.wkSession = err.response.cookie.value
                await this.loadData('http://wekings.ru/game/inventories/user')
            } else {
                throw err
            }
        }
    }

    protected getUrlBuy(nameItem: string): string {
        return `http://wekings.ru/game/
        confirm?back_url=/game/shop/dealers/gifts?
        page=1&icon=a_silver&key_part=9fee&
        text=купить Коробочка в количестве 1 за 100 серебра&url=
        /game/shop/dealers/gifts/buy?item=${nameItem}&page=1&quantity=1`
    }
}
