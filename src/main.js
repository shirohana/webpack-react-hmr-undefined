// @flow
import React from 'react'
import { render } from 'react-dom'

const APP_ROOT_ID = 'app-root'
const APP_ROOT = document.getElementById(APP_ROOT_ID)

import('./app/index').then(({ default: App }) => {
  const app = React.createElement(App)
  render(app, APP_ROOT)
})
