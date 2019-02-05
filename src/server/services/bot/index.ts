import { RequestResponse } from 'request'
import { IAccess, IReqTransform, IReqOptions } from './interface'

import cheerio from 'cheerio'
import rp from 'request-promise'
import tough from 'tough-cookie'

const cookie = tough.Cookie

export default class WeBot {
    public readonly rememberToken: string
    public wkSession: string
    public resp: IReqTransform

    public constructor({rememberToken, wkSession}: IAccess) {
        this.wkSession = wkSession
        this.rememberToken = rememberToken
    }

    public async loadData(url: string, method: string = 'GET'): Promise<void> {
        const options: IReqOptions = {
            uri: url,
            method,
            followRedirect: false,
            resolveWithFullResponse: true,
            transform: this.requestTransform,
            headers: {
                // cookie: cookie.serialize('_wk_session', this.wkSession) + '; ' +
                //     cookie.serialize('remember_token', this.rememberToken)
                cookie: new cookie({key: '_wk_session', value: this.wkSession}).toString() + '; ' +
                    new cookie({key: 'remember_token', value: this.rememberToken}).toString()
            }
        }
        this.resp = await rp(options)
    }

    protected requestTransform = (body: any, response: RequestResponse): IReqTransform => {
        const $: CheerioStatic = cheerio.load(body, {decodeEntities: false})
        console.log('notify::', $('.info .notifications_block:first-child .notice td:last-child').text())
        return {
            statusCode: response.statusCode,
            $,
            headers: response.headers,
            cookie: cookie.parse(response.headers['set-cookie'][0])
        }
    }
}
