const cron = require('node-cron')

cron.schedule('* */23 * * *', () => {
    console.log('running on Sundays of January and September')
})


module.exports = cron
