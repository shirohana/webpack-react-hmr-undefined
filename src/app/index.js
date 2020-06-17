// @flow
import hot from './hot'
// import IndexPage from '../pages/index'

const NODE_ID = `app-${String(Math.random()).slice(2, 8)}`

function App () {
  const el = document.getElementById(NODE_ID) || document.createElement('div')
  el.id = NODE_ID

  Array.from(el.childNodes).forEach(el => el.remove())
  el.appendChild(document.createTextNode('app/index'))

  // this.el.appendChild(IndexPage())

  return el
}

export default hot(module)(App)
