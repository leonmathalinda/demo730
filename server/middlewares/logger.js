const logger = async (ctx, next)=>{
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
    await next();
}

module.exports = logger;