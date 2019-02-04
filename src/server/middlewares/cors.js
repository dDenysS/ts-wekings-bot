module.exports = app => {
    app.use(async (ctx, next) => {
        ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS,DELETE,PUT')
        ctx.set(
            'Access-Control-Allow-Headers',
            ctx.get('Access-Control-Request-Headers')
        )
        ctx.set('Access-Control-Allow-Credentials', 'true')
        //process.env.NODE_ENV === 'development' ? ctx.request.headers.origin : process.env.CORS
        ctx.set('Access-Control-Allow-Origin', ctx.request.headers.origin)
        await next()
    })
}
