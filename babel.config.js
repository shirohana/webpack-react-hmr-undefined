'use strict'

module.exports = function (api) {
  api.env()

  return {
    presets: [
      ['@babel/env', { useBuiltIns: false }]
    ]
  }
}
