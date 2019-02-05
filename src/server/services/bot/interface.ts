import { Cookie } from 'tough-cookie'
import { RequestResponse } from 'request'

export interface IAccess {
    rememberToken: string,
    wkSession: string
}

export interface IReqTransform {
    statusCode: number,
    $: CheerioStatic,
    headers: any,
    cookie: Cookie
}

export interface IReqOptions {
    uri: string,
    method: string,
    resolveWithFullResponse: boolean,
    followRedirect: boolean,

    transform(body: any, response: RequestResponse): IReqTransform

    headers: {
        cookie: string
    }
}
