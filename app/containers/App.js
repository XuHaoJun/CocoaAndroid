import React, {Component} from 'react'
import {ToastAndroid, Platform, BackAndroid} from 'react-native'
import {Scene, Router, Actions, Reducer} from 'react-native-router-flux'
import AboutPage from '../components/AboutPage'
import DeviceManagerPage from '../components/DeviceManagerPage'
import OminoEditorPage from './OminoEditorPage'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.handleAndroidBackPress = this.handleAndroidBackPress.bind(this)
    this.reducerCreate = this.reducerCreate.bind(this)
    this.routerIndex = 0
  }

  handleAndroidBackPress() {
    if (this.routerIndex == 0) {
      ToastAndroid.show('exit app', ToastAndroid.SHORT)
      return false
    }
    Actions.pop()
    return true
  }

  reducerCreate(params) {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
      if (state !== null) {
        this.routerIndex = state.index
      }
      return defaultReducer(state, action);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.handleAndroidBackPress)
    }
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.handleAndroidBackPress)
    }
  }

  render() {
    if (Platform.OS === 'web') {
      return (
        <View>
          not support web
        </View>
      )
    }
    return (
      <Router createReducer={this.reducerCreate}>
        <Scene key='root' hideTabBar hideNavBar>
          <Scene key='ominoEditorPage' component={OminoEditorPage} initial/>
          <Scene key='deviceManagerPage' component={DeviceManagerPage}/>
          <Scene key='aboutPage' component={AboutPage}/>
        </Scene>
      </Router>
    )
  }
}
