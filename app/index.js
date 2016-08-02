import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './containers/App'
import Immutable from 'immutable'

const stateBefore = {
  'node_0': {
    id: 'node_0',
    childIds: [ 'node_1' ]
  },
  'node_1': {
    id: 'node_1',
    childIds: []
  },
  'node_2': {
    id: 'node_2',
    childIds: [ 'node_3', 'node_4' ]
  },
  'node_3': {
    id: 'node_3',
    childIds: []
  },
  'node_4': {
    id: 'node_4',
    childIds: []
  }
}
const store = configureStore(Immutable.fromJS({omino: stateBefore}))

class Root extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}

export default Root
