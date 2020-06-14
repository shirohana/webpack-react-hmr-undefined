'use strict'

const { join } = require('path')

process.env.DEBUG = (process.env.DEBUG || '') + ',koa*'

const Koa = require('koa')

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3000

const webpackConfigDevelopmentOnly = require('../build/config/webpack.config')
const compiler = require('webpack')(webpackConfigDevelopmentOnly)

const app = new Koa()

// Log request url
app.use(async (ctx, next) => {
  console.log('>', ctx.url)
  next()
})

// These two custom middlewares do the wrap from Express to Koa
app.use(require('./middlewares/koa-webpack-dev-middleware')(compiler))
app.use(require('./middlewares/koa-webpack-hot-middleware')(compiler, { log: false }))

// Log request url which pass through
// `webpack-dev-middleware` and `webpack-hot-middleware`
app.use(async (ctx, next) => {
  console.log('>>>', ctx.url)
  next()
})

// Redirect document requests to index.html for Single Page Application
app.use(require('./middlewares/koa-serve-spa')(
  join(compiler.outputPath, 'index.html'),
  { fs: compiler.outputFileSystem }
))

app.listen(PORT, HOST, () => {
  const uri = `http://${HOST}:${PORT}`
  const messages = [
    `Server starts in development mode at ${uri}\n`,
    'Initializing environment...'
  ]
  process.stdout.write(messages.join('\n'))
})
