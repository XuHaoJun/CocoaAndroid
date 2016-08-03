import React, {Component} from 'react';
import {View, Text, Linking} from 'react-native';
import {Actions} from 'react-native-router-flux';
import CustomToolbar from '../components/CustomToolbar'
import ExternalLink from '../components/ExternalLink'

export default class About extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column'
      }}>
        <CustomToolbar title="About"/>
        <View
          style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5FCFF'
        }}>
          <Text>{JSON.stringify(this.props)}</Text>
          <Text>Cocoa Github:</Text>
          <ExternalLink href="https://github.com/ywchiao/cocoa">
            <Text style={{
              color: '#2980b9'
            }}>
              https://github.com/ywchiao/cocoa
            </Text>
          </ExternalLink>
        </View>
      </View>
    )
  }
}
