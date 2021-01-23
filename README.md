# koa-default-body
Koa middleware which sets `ctx.body = ''` to return `HTTP 200`

<br/>

By default, if you leave `ctx.body` `undefined`, Koa returns `HTTP 404 Not Found` - this middleware sets `ctx.body = ''` and Koa will return `HTTP 200`

But if you set `ctx.body` or `ctx.status`, this middleware will use it (instead of setting `ctx.body = ''`)

### example

```
import Koa from 'koa'
import Router from 'koa-router'
import defaultBody from 'koa-default-body'

const app = new Koa()
const router = new Router()

router.post('/returns-200-not-404', () => {})
router.get('/return-your-status-or-body', ctx => {
  ctx.body = 'my body my choice'
  ctx.status = 403
})

app.use(defaultBody(router.routes()))
app.use(router.routes())

app.listen(3000) // pass your port

```

### purpose

It's for reducing boilerplate `ctx.body = ''` at the end of route handler (function with ctx), for undefined routes response is still 404 !

  - `ctx.body = ''` is set ONLY for routers registered with `app.use(router.routes())`. When requesting undefined route, like `/foo` - it will still return 404.

