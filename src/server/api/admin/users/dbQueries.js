const {User} = require('../../../database/models')

class Queries {
    static async getUsers({page, rowsPerPage, sortBy, descending, search}) {
        //page start with 0
        const direction = String(descending) === 'true' ? 'desc' : 'asc'
        const sort = sortBy ? sortBy : 'id'

        return await User.query()
            .orderBy(sort, direction)
            .orWhere('email', 'like', `%${search}%`)
            .page(page, rowsPerPage)
    }
}

module.exports = Queries
