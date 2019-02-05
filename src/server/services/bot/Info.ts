import { IAccess } from './interface'
import WeBot from './index'

export default class WeInfo extends WeBot {

    public constructor({rememberToken, wkSession}: IAccess) {
        super({rememberToken, wkSession})
    }

    public async isExistItem(name: string): Promise<boolean> {
        const $: CheerioStatic = this.resp.$
        let exist: boolean = false

        await this.loadData('http://wekings.ru/game/inventories')

        this.resp.$('.page_game_inventories_user .block')
            .each(function () {
                if (~$(this).html().search(name)) {
                    exist = true
                }
            })
        return exist
    }

    public async initLoadData(): Promise<boolean> {
        await this.loadData('http://wekings.ru/game/inventories')
        return !!this.level
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
