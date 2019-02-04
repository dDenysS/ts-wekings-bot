const Joi = require('joi')

module.exports = (schema, type) => (ctx, next) => {
    if (!('valid' in ctx)) ctx.valid = {}

    let data
    switch (type) {
        case 'params': {
            data = ctx.params
            break
        }
        case 'query': {
            data = ctx.query
            break
        }
        case 'body': {
            data = ctx.request.body
            break
        }
        default: {
            throw new Error('type not found')
        }
    }
    const result = Joi.validate(data, schema, {convert: true})

    if (result.error !== null) {
        ctx.status = 400
        return ctx.body = {
            message: 'Не вірнні дані. Не проходить валідацію',
            error: result.error
        }
    }
    return result.then(result => {
        ctx.valid[type] = result
        return next()
    })
}
