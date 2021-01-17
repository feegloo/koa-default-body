# koa-default-body
Koa middleware which sets `ctx.body = ''` to return HTTP 200 (for `undefined` body, Koa returns by default `HTTP 404 Not Found`)

It's for reducing boilerplate `ctx.body = ''` at the end of route handler (function with ctx), for undefined routes response is still 404 ! (see below) 

`ctx.body = ''` is set ONLY for registered routes(in below code `/200`). When requesting undefined route, like `/foo` - it will still return 404.


```
import Koa from 'koa'
import Router from 'koa-router'
import emptyBody200 from './index.js'

const app = new Koa()

const router = new Router()
router.get('/200', () => {})

app.use(emptyBody200(router))
app.use(router)

```
