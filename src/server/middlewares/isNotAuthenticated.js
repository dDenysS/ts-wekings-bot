module.exports = ({redirect}) => (ctx, next) => {
    if (ctx.isAuthenticated()) {
        if (redirect) {
            ctx.redirect(ctx.headers.alias)
        } else {
            ctx.status = 403
            return ctx.body = {message: 'You is auth. Server can not do this request again'}
        }
    }
    return next()
}
