// sets ctx.body = '' so you don't have to do it (to avoid 404)
//
// @param routers: Router || Array<Router> - passed during initialization
module.exports = routers => async (ctx, next) => {
  await next()

  for (const r of Array.isArray(routers) ? routers: [routers]) {
    for (const stack of r.stack) {
      // TODO: more bullet-proof replacing url
      // use '/foo/:param1/:param2' of router and compare with actual ctx.url
      const url = ['PATCH', 'DELETE'].includes(ctx.method) ? ctx.url.replace(/\/[^\/]*$/, '') : ctx.url

      if (
        stack.path.includes(url) &&
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
