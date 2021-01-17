# koa-default-body
Koa middleware which sets `ctx.body = ''` to return HTTP 200 (for `undefined` body, Koa returns HTTP 404 Not Found)


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
