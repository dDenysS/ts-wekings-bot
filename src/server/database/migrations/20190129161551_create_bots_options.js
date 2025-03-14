exports.up = async knex => {
    await knex.schema.createTable('bots_options', table => {
        table.increments().primary()
        table.integer('bot_id').references('bots.id').notNullable().onDelete('CASCADE')

        table.boolean('is_gifts_on').defaultTo(false)
        table.jsonb('gifts').defaultTo(null)// [{giftName:string,usersId:number}]

        table.boolean('is_curses_on').defaultTo(false)
        table.jsonb('curses').defaultTo(null) // [{curseName:string,usersId:number}]

        table.boolean('is_mine_on').defaultTo(false)
        table.integer('chance_to_mine').defaultTo(20)
    })
}

exports.down = async knex => {
    await knex.schema.dropTable('bots_options')
}
