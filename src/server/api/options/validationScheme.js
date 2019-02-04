const Joi = require('joi')

module.exports.gifts = Joi.object().keys({
    status: Joi.boolean().required(),
    gifts: Joi.array().items(Joi.object().keys({
        userId: Joi.number().integer().min(0).required(),
        giftId: Joi.number().integer().min(0).required(),
    })).max(3)
})

module.exports.idBot = Joi.object().keys({
    idBot: Joi.number().integer().min(0).max(100000).required(),
})

module.exports.curses = Joi.object().keys({
    status: Joi.boolean().required(),
    curses: Joi.array().items(Joi.object().keys({
        userId: Joi.number().integer().min(0).required(),
        curseId: Joi.number().integer().min(0).required(),
    }))
})

module.exports.mine = Joi.object().keys({
    status: Joi.boolean().required(),
    chanceToMine: Joi.number().integer().min(0).max(100).required()
})


