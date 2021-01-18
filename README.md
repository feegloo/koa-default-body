# koa-default-body
Koa middleware which sets `ctx.body = ''` to return HTTP 200

If you leave `ctx.body` `undefined`, Koa returns by default `HTTP 404 Not Found`
If you set `ctx.body` or `ctx.status`, this middleware will use it (instead of setting `ctx.body = ''`)

### example

```
import Koa from 'koa'
import Router from 'koa-router'
import koaDefaultBody from 'koa-default-body'

const app = new Koa()

const router = new Router()
router.post('/returns-200-not-404', () => {})

const router2 = new Router()
router2.get('/return-your-status-or-body`, ctx => {
  ctx.body = 'my body my choice'
  ctx.status = 500
})

app.use(koaDefaultBody([router1,router2]))

app.use(router1)
app.use(router2)

```

### purpose

It's for reducing boilerplate `ctx.body = ''` at the end of route handler (function with ctx), for undefined routes response is still 404 ! (see below) 

`ctx.body = ''` is set ONLY for registered routes(in below code `/200`). When requesting undefined route, like `/foo` - it will still return 404.

