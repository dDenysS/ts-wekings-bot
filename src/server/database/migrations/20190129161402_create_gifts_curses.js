
exports.up = async knex => {
    await knex.schema.createTable('gifts', table => {
        table.increments().primary()
        table.string('gift_name').notNullable()
        table.string('url_name').notNullable()
        table.integer('level').notNullable()
        table.integer('silver_price').notNullable()
        table.integer('crystal_price').notNullable()
        table.integer('page').notNullable()
    })

    await knex.schema.createTable('curses', table => {
        table.increments().primary()
        table.string('curse_name').notNullable()
        table.string('url_name').notNullable()
        table.integer('level').notNullable()
        table.integer('silver_price').notNullable()
        table.integer('crystal_price').notNullable()
        table.integer('page').notNullable()

    })
}

exports.down = async knex => {
    await knex.schema.dropTable('gifts')
    await knex.schema.dropTable('curses')
}
