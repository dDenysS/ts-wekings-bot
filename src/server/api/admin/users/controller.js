const dbQueries = require('./dbQueries')

module.exports = {
    async getUsers(ctx) {
        const {query} = ctx.valid
        ctx.body = await dbQueries.getUsers(query)
    }
}
