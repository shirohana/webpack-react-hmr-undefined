// @flow
const hotHoc = (m) => {
  m.hot && m.hot.accept(() => {
    // This self-accepted hoc function use the referecne
    // from args and cause the error
    console.log('src/app/hot: self-accepted')

    // We don't do re-render for the app, the error
    // will be occurred before re-render
  })
  return a => a
}

export default hotHoc
