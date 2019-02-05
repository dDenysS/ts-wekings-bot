import WeGift from './Gifts'
import { IAccess } from './interface'

export default class WeCurse extends WeGift {
    protected readonly type: string

    constructor({rememberToken, wkSession}: IAccess) {
        super({rememberToken, wkSession})
        this.type = 'curse'
    }

    protected static getUrlBuy(nameItem: string): string {
        return `http://wekings.ru/game/
        confirm?back_url=/game/shop/dealers/curses?page=2
        &icon=a_silver&key_part=9739&text=купить Отравленный пирог в количестве 1 за 3000
         серебра&url=/game/shop/dealers/curses/buy?item=${nameItem}&page=2&quantity=1`
    }
}
