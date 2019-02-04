const Joi = require('joi')
const url = require('url')

const password = require('./password')

const schemaPaginate = Joi.object().keys({
    page: Joi.number().integer().min(0).max(10000).default(0),
    rowsPerPage: Joi.number().integer().min(0).max(10000).default(20),
    descending: Joi.any().allow('false', 'true').default('false'),
    sortBy: Joi.string().min(0).max(300).default('id'),
    search: Joi.string().min(0).max(300).allow('').default(''),
})

const schemaRegistration = password => Joi.object().keys({
    email: Joi.string().email({minDomainAtoms: 2}),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/),
    confirmPassword: Joi.string().valid(password).required(),
    confirmRight: Joi.boolean().valid(true).required(),

    name: Joi.string().min(1).max(20).required(),
    second_name: Joi.string().min(1).max(20).required(),
    surname: Joi.string().min(1).max(20).required(),

    region_id: Joi.number().integer().min(0).max(10000).required(),
    city_id: Joi.number().integer().min(0).max(10000).required(),
    network_id: Joi.number().integer().min(0).max(10000).required(),
    pharmacy_id: Joi.number().integer().min(0).max(10000).required(),
})

function getRoleName(href) {
    const subdomain = new URL(href).host.split('.')[0]
    const roles = {
        network: 'networkOwner',
        apteka: 'pharmacist',
        enterprise: 'enterprise',
        admin: 'admin'
    }
    return roles[subdomain]
}

module.exports = {
    schemaPaginate,
    password,
    getRoleName,
    schemaRegistration
}
