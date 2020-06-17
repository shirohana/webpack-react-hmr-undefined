// @flow
import App from './app/index'

const APP_ROOT_ID = 'app-root'
const APP_ROOT = document.getElementById(APP_ROOT_ID)

function render (Component) {
  Array.from(APP_ROOT.childNodes).forEach(el => el.remove())
  APP_ROOT.appendChild(Component())
}

render(App)
