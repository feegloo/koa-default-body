// sets ctx.body = '' so you don't have to do it (to avoid 404)
//
// @param routers: Router || Array<Router> - passed during initialization
module.exports = routers => async (ctx, next) => {
  await next()

  for (const r of Array.isArray(routers) ? routers: [routers]) {
    for (const stack of r.stack) {
      if (
        stack.regexp.test(ctx.path) &&
        stack.methods.includes(ctx.method) &&
        ctx.status === 404 &&
        ctx.body === undefined
      ) {
        ctx.body = ''
        ctx.status = 200

        break
      }
    }
  }
}
