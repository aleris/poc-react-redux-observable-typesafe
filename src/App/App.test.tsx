import * as React from 'react'
import App from './App'
import { Provider } from 'react-redux'
import store from '../store'
import { render } from 'react-dom'

describe('App', function() {
  it('renders without crashing', () => {
    const Root = () => (
      <Provider store={store}>
        <App />
      </Provider>
    )

    const div = document.createElement('div')
    render(<Root />, div)
  })
})
