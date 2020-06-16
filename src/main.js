// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/index'

const APP_ROOT_ID = 'app-root'
const APP_ROOT = document.getElementById(APP_ROOT_ID)

function render (Component) {
  ReactDOM.render(
    React.createElement(Component),
    APP_ROOT
  )
}

render(App)
