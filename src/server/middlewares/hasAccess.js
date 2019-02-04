module.exports = rolesRequired => (ctx, next) => {
    const hasAccess = rolesRequired.includes(ctx.state.user.role_name)
    if (hasAccess) return next()

    ctx.status = 403
    ctx.body = {message: 'Not access'}
}
