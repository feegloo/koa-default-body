# koa-default-body
Koa middleware which sets ctx.body = '' to return 200 instead of 404 for undefined body


```
import Koa from 'koa'
import Router from 'koa-router'
import emptyBody200 from './empty-body-200'

const app = new Koa()

const router = new Router()
router.get('/200', () => {})

app.use(emptyBody200(router))
app.use(router)

```
