exports.seed = async knex => {
    await knex('bots').del()
    await knex('users').del()
    await knex('gifts').del()
    await knex('curses').del()
}
