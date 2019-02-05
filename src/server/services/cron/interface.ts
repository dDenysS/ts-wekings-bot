import { IAccess } from '../bot/interface'

export interface IItem {
    urlName: string,
    userId: number
}
export interface IOptions {
    gifts: IItem[],
    curses: IItem[],
    isGiftsOn: boolean,
    isCursesOn: boolean
}


export interface IBot extends IAccess {
    options: IOptions
}
