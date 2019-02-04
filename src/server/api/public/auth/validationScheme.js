const Joi = require('joi')

module.exports.registration = Joi.object().keys({
    email: Joi.string().email({minDomainAtoms: 2}).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
})

module.exports.login = Joi.object().keys({
    email: Joi.string().email({minDomainAtoms: 2}).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
})
