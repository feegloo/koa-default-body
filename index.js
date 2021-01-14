// sets ctx.body = '' so you don't have to do it (to avoid 404)
// routers - passed during initialization
//
// app.use(defaultBody(routers))
export default (routers) => async (ctx, next) => {
  await next()

  // TODO: Rambda
  for (const r of routers) {
    const paths = r.stack.map((i) => i.path)

    if (paths.includes(ctx.url) && ctx.status === 404 && ctx.body === undefined) {
      ctx.body = ''
      ctx.status = 200
      break
    }
  }
}
