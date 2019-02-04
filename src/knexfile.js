module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://postgres:256@localhost:5432/bot',
        migrations: {
            directory: './server/database/migrations'
        },
        seeds: {
            directory: './server/database/seeds'
        }
    },

    production: {
        client: 'pg',
        connection: 'postgres://lzoywqgzuekvju:67756c347ae85c2098ee21d0e486b5931ad593932fe42e0e77ca5d8a2f42a51d@ec2-54-247-82-210.eu-west-1.compute.amazonaws.com:5432/d3ehsgetm3kals?ssl=true',
        migrations: {
            directory: './server/database/migrations'
        },
        seeds: {
            directory: './server/database/seeds'
        }
    }
}
