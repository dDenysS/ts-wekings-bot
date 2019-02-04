module.exports = (ctx,next) => {
    if (!ctx.isAuthenticated()) {
        ctx.status = 401
        return ctx.body = {message: 'Authenticate fail'}
    }
    return next()
}
