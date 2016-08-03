/**
 * React Native for Web Starter App
 * https://github.com/grabcode/react-native-web-starter
 * Follow me https://twitter.com/grabthecode
 */

import {AppRegistry} from 'react-native'
import App from './app'

import React, {Component} from 'react';
import {Text, View} from 'react-native';

class Hello extends Component {
  render() {
    return (
      <View>
        <Text>hello2</Text>
      </View>
    )
  }
}

AppRegistry.registerComponent('CocoaAndroid', () => App)
AppRegistry.runApplication('CocoaAndroid', {rootTag: document.getElementById('react-root')})
