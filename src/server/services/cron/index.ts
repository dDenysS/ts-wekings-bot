import cron from 'node-cron'

import giftsStart from './gifts'
import cursesStart from './curses'

cron.schedule('* 7 * * *', () => {
    giftsStart().catch(console.log)
    cursesStart().catch(console.log)
})
