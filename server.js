const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const port = parseInt(process.env.PORT, 10) || 8868
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
// const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router()

    router.get('/', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/', ctx.query)
    })

    router.get('/search', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/search', ctx.query)
    })

    router.get('/loan', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/1-loan/1-home', ctx.query)
    })

    router.get('/loan/:id', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/1-loan/2-detail', ctx.query)
    })

    router.get('/card', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/2-card/1-home', ctx.query)
    })

    router.get('/card/list', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/2-card/2-list', ctx.query)
    })

    router.get('/card/:id', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/2-card/3-detail', ctx.query)
    })

    router.get('/me', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/3-me/1-home', ctx.query)
    })

    router.get('/login', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/3-me/2-login', ctx.query)
    })

    router.get('/me/favorite', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/3-me/3-favorite', ctx.query)
    })

    router.get('/me/history', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/3-me/4-history', ctx.query)
    })

    router.get('/me/about', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/3-me/5-about', ctx.query)
    })

    router.get('/me/feedback', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/3-me/6-feedback', ctx.query)
    })

    router.get('*', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/_error.js', ctx.query)
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

