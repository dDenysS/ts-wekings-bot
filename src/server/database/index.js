const knex = require('knex')

const connection = require('../../knexfile')[process.env.NODE_ENV.trim()]

const {Model} = require('objection')

const knexConnection = knex(connection)
Model.knex(knexConnection)

module.exports = Model
