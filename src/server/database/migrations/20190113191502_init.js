exports.up = async knex => {
    await knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('email').unique().notNullable()
        table.text('password_hash').notNullable()
        table.boolean('is_admin').defaultTo(false)
        table.integer('amount_bots').defaultTo(1)
        table.boolean('access_bots').defaultTo(false)
        table.boolean('confirm_email').defaultTo(false)
    })

    await knex.schema.createTable('bots', table => {
        table.increments('id').primary()
        table.text('name').notNullable() //TODO ad unique
        table.boolean('is_bot_on').defaultTo(false)
        table.integer('user_id').references('users.id').notNullable()
        table.text('wk_session').notNullable()
        table.string('remember_token').notNullable()
        table.integer('level').notNullable()
        table.integer('healthy').notNullable()
        table.integer('silver').notNullable()
        table.integer('crystal').notNullable()
        table.integer('gold').notNullable()
        table.integer('fights').notNullable()
        table.timestamps(true, true) //TODO
    })

}

exports.down = async knex => {
    await knex.schema.dropTable('bots')
    await knex.schema.dropTable('users')
}
