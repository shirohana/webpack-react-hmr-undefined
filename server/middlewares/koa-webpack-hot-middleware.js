'use strict'

const whm = require('webpack-hot-middleware')

module.exports = function koaWebpackHotMiddleware (compiler, options) {
  const handleWhm = whm(compiler, options)

  return async function middleware (ctx, next) {
    const originalRespond = ctx.respond
    const bypass = () => {
      ctx.respond = originalRespond
      next()
    }
    ctx.respond = false

    handleWhm(ctx.req, ctx.res, bypass)
  }
}
