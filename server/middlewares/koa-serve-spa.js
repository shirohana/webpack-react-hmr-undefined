'use strict'

module.exports = function koaServeSpa (filename, options = {}) {
  const { fs } = options

  if (!fs) {
    throw new TypeError('options.fs must be provided!')
  }

  return async function middleware (ctx) {
    if (ctx.headerSent || ctx.body != null)
      return
    if (ctx.method !== 'GET')
      return

    const dest = ctx.get('Sec-Fetch-Dest')
    if (!dest || dest !== 'document')
      return

    try {
      const content = fs.readFileSync(filename)
      ctx.set('Content-Type', 'text/html')
      ctx.body = content
    } catch (err) {
      if (ctx.status !== 404)
        throw err
    }
  }
}
