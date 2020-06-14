'use strict'

const _wdm = require('webpack-dev-middleware')
// TODO Patch `webpack-dev-middleware` exports esm in early v4.
// See: https://github.com/webpack/webpack-dev-middleware/issues/652
const wdm = (typeof _wdm === 'object' && typeof _wdm.default === 'function' ? _wdm.default : _wdm)

module.exports = function koaWebpackDevMiddleware (compiler, options) {
  const handleWdm = wdm(compiler, options)

  return async function middleware (ctx, next) {
    Object.assign(ctx.response, {
      locals: ctx.state,
      setHeader: (...args) => ctx.set.apply(ctx, args),
      send: content => (ctx.body = content)
    })

    handleWdm(ctx.request, ctx.response, next)
  }
}
