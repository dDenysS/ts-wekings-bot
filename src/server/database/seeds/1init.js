exports.seed = async knex => {
    await knex('bots').del()
    await knex('users').del()
    await knex('gifts').del()
    await knex('curses').del()

    await knex('users').insert({
        email: 'admin@admin.com',
        password_hash: '4ac962621632ea6391ae29a45ce52129b5e1e552a0f2873a1c80dde124f9696f330562cad046a5111b0b7521b4c477982c258fd1b8b59e1b50dbae26bc98c95dd874d9845b4cf1375a5164b3d3fc47bdec55ad55d06e5c7d157fca7b23650a3d5fccf8a0b89c1f1e9ce8d36e255b5cc6e2cf9a49134fc3e0b652512d960a135c'
    })
}
