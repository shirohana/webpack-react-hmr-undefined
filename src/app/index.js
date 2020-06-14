// @flow
import React from 'react'
import { hot } from 'react-hot-loader/root'

import IndexPage from '../pages/index'

const App = () => {
  return React.createElement(
    'div',
    null,
    React.createElement('h1', null, 'app/index'),
    React.createElement(IndexPage)
  )
}

export default hot(App)
