// sets ctx.body = '' so you don't have to do it (to avoid 404)
//
// @param routers: Router || Array<Router> - passed during initialization
//
// TODO: refactor to (routers) => async (ctx, next) => {...}
// and pass routers during initialization
export default (routers) => async (ctx, next) => {
  await next()

  // TODO: Rambda
  for (const r of Array.isArray(routers) ? routers: [routers]) {
    for (const stack of r.stack) {
      const url = ctx.method === 'PATCH' ? ctx.url.replace(/\/[^\/]*$/, '') : ctx.url

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
