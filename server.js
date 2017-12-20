const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
// const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router()

    router.get('/', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/2-containers/01-Home/index', ctx.query)
    })

    router.get('/search', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/2-containers/01-Home/search', ctx.query)
    })

    router.get('*', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/2-containers/NotFound', ctx.query)
    })

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })

    server.use(router.routes())
    server.listen(port, (err) => {
      if (err) throw err
      console.info(`> Ready on http://localhost:${port}`)
    })
  })

