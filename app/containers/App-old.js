import React, { Component, PropTypes } from 'react'
import { Navigator, Text, TouchableHighlight, View, Platform, StatusBar, Dimensions, StyleSheet, Image,
   TouchableOpacity, BackAndroid, ToastAndroid } from 'react-native'
import DrawerLayoutAndroid from 'react-native-drawer-layout'
import Omino from './Omino'
import CustomToolbar from '../components/CustomToolbar'

const ExternalLink = (props) => <Text {...props} accessibilityRole='link' target='_blank' />

import { Scene, Router, Actions, Reducer } from 'react-native-router-flux'

import PageOne from './PageOne'
import PageTwo from './PageTwo'
import About from './About'
import Drawer from './Drawer'

export default class Apppp extends Component {
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
        if (state !== null ) {
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
        <App/>
      )
    }
    return (
      <Router createReducer={this.reducerCreate} >
          <Scene key='root' hideTabBar hideNavBar>
              <Scene key='main' component={App} />
              <Scene key='deviceManagerPage' component={DeviceManagerPage} />
              <Scene key='pageOne' component={About} title='PageOne' />
              <Scene key='pageTwo' component={PageTwo} title='PageTwo' />
          </Scene>
      </Router>
    )
  }

  render2 () {
    return (
      <Router>
          <Scene key='root' hideTabBar duration={1}>
              <Scene key='drawer' component={Drawer} duration={1} >
                  <Scene key='main' duration={1}>
                      <Scene key='pageOne' component={PageOne} title='PageOne' duration={1} />
                      <Scene key='pageTwo' component={PageTwo} title='PageTwo' duration={1} />
                  </Scene>
              </Scene>
          </Scene>
      </Router>
    )
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.onIconClicked = this.onIconClicked.bind(this)
    this.renderNavigationView = this.renderNavigationView.bind(this)
  }

  onIconClicked () {
    this.refs.drawer.openDrawer()
  }

  onPressDrawerItem (key) {
    this.refs.drawer.closeDrawer()
    switch(key) {
      case 'Omino IDE':
      return
      case 'Device Manager':
      return
      case 'About':
      default:
      Actions.pageOne()
    }
  }

  renderNavigationView () {
    return (
      <View style={[styles.container, {backgroundColor: '#fcfcfc'}]}>
          <Image style={{width: Dimensions.get('window').width / 5 * 3, height: 120, justifyContent: 'flex-end', paddingBottom: 10}} source={require('../img/kiki.jpg')}>
              <Text style={{fontSize: 20, textAlign: 'left', color: '#fcfcfc', marginLeft: 10}}>
                  Cocoa
              </Text>
          </Image>
          <TouchableOpacity style={styles.drawerContent} onPress={this.onPressDrawerItem.bind(this, 'Omino IDE')}>
              <Text style={styles.drawerText}>
                  Omino IDE
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerContent} onPress={this.onPressDrawerItem.bind(this, 'Device Manager')}>
              <Text style={styles.drawerText}>
                  Device Manager
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerContent} onPress={this.onPressDrawerItem.bind(this, 'About')}>
              <Text style={styles.drawerText}>
                  About
              </Text>
          </TouchableOpacity>
      </View>
    )
  }

  renderOmino () {
    return (
      <DrawerLayoutAndroid
          ref='drawer'
          drawerWidth={Dimensions.get('window').width / 5 * 3}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={this.renderNavigationView}>
          <StatusBar backgroundColor="black" />
          <View style={{ flex: 1, flexDirection: 'column' }}>
              <CustomToolbar navIcon={require('../img/menu.png')} onIconClicked={this.onIconClicked} />
              <Omino/>
          </View>
      </DrawerLayoutAndroid>
    )
  }

  render () {
    if (Platform.OS === 'web') {
      return (
        <View>
            <CustomToolbar navIcon={require('../img/menu.png')} onIconClicked={this.onIconClicked} />
            <Omino/>
            <Text>
                not support web router, drawerLayoutAndroid
            </Text>
            <ExternalLink href='https://github.com/ywchiao/cocoa'>
                <Text>
                    Cocoa github
                </Text>
            </ExternalLink>
        </View>
      )
    }
    return this.renderOmino()
  }

  renderNav () {
    return (
      <View style={{flex: 1}}>
          <Navigator initialRoute={{ title: 'My Initial Scene', index: 0 }} renderScene={(route, navigator) =>
              <MyScene
                  title={route.title}

                  // Function to call when a new scene should be displayed
                  onForward={() => {
                      const nextIndex = route.index + 1
                      navigator.push({
                          title: 'Scene ' + nextIndex,
                          index: nextIndex,
                      })
                  }}

                  // Function to call to go back to the previous scene
                  onBack={() => {
                      if (route.index > 0) {
                          navigator.pop()
                      }
                  }}
              />} />
      </View>
    )
  }
}

class MyScene extends Component {
  render () {
    return (
      <View>
          <Text>
              Current Scene:
              {this.props.title}
          </Text>
          <TouchableHighlight onPress={this.props.onForward}>
              <Text>
                  Tap me to load the next scene
              </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.props.onBack}>
              <Text>
                  Tap me to go back
              </Text>
          </TouchableHighlight>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  containerItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  title: {
    flex: 3,
    fontSize: 18,
    textAlign: 'left',
    color: 'black'
  },
  listView: {
    backgroundColor: '#eeeeec'
  },
  no_data: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100
  },
  drawerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  drawerIcon: {
    width: 30,
    height: 30,
    marginLeft: 5
  },
  drawerText: {
    fontSize: 18,
    marginLeft: 15,
    textAlign: 'center',
    color: 'black'
  }
})
