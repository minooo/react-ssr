const next = require('next')
const Koa = require('koa')
const router = require('koa-route')
const LRUCache = require('lru-cache')

const port = parseInt(process.env.PORT, 10) || 8868
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60, // 1hour
})

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(ctx) { return ctx.url }

function renderAndCache(ctx, pagePath, noCache, queryParams = null) {
  if (dev) ssrCache.reset()
  if (noCache === 'noCache') {
    return app.renderToHTML(ctx.req, ctx.res, pagePath, queryParams)
      .then((html) => {
        // Let's cache this page
        console.info('no cache')
        ctx.body = html
      })
      .catch((err) => {
        console.info('ERRR', err)
        return app.renderError(err, ctx.req, ctx.res, pagePath, queryParams)
      })
  }

  const key = getCacheKey(ctx.req)

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    console.info(`CACHE HIT: ${key}`)
    ctx.body = ssrCache.get(key)
    return Promise.resolve()
  }

  // If not let's render the page into HTML
  return app.renderToHTML(ctx.req, ctx.res, pagePath, queryParams)
    .then((html) => {
      // Let's cache this page
      console.info(`CACHE MISS: ${key}`)
      ssrCache.set(key, html)
      ctx.body = html
    })
    .catch((err) => {
      console.info('ERRR', err)
      return app.renderError(err, ctx.req, ctx.res, pagePath, queryParams)
    })
}
app.prepare()
  .then(() => {
    const server = new Koa()

    server.use(router.get('/', ctx => renderAndCache(ctx, '/index')))
    server.use(router.get('/search', ctx => renderAndCache(ctx, '/search')))
    server.use(router.get('/loan', ctx => renderAndCache(ctx, '/1-loan/1-home')))
    server.use(router.get('/loan/go', ctx => renderAndCache(ctx, '/1-loan/3-goLoan')))
    server.use(router.get('/loan/:id', ctx => renderAndCache(ctx, '/1-loan/2-detail', 'noCache')))
    server.use(router.get('/card', ctx => renderAndCache(ctx, '/2-card/1-home')))
    server.use(router.get('/card/list', ctx => renderAndCache(ctx, '/2-card/2-list')))
    server.use(router.get('/card/:id', ctx => renderAndCache(ctx, '/2-card/3-detail', 'noCache')))
    server.use(router.get('/me', ctx => renderAndCache(ctx, '/3-me/1-home', 'noCache')))
    server.use(router.get('/login', ctx => renderAndCache(ctx, '/3-me/2-login')))
    server.use(router.get('/me/favorite', ctx => renderAndCache(ctx, '/3-me/3-favorite', 'noCache')))
    server.use(router.get('/me/history', ctx => renderAndCache(ctx, '//3-me/4-history', 'noCache')))
    server.use(router.get('/me/about', ctx => renderAndCache(ctx, '/3-me/5-about')))
    server.use(router.get('/me/feedback', ctx => renderAndCache(ctx, '/3-me/6-feedback')))
    server.use(router.get('/me/data', ctx => renderAndCache(ctx, '/3-me/7-myData', 'noCache')))

    server.use(async (ctx) => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.info(`> Ready on http://localhost:${port}`)
    })
  })
