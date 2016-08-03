import React, {Component, PropTypes} from 'react'
import {Text, Linking, Platform, TouchableHighlight} from 'react-native'

export default class ExternalLink extends Component {
  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    const url = this.props.href;
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    const style = this.props.style && {
      color: '#2980b9'
    };
    if (Platform.OS === 'web') {
      return (<Text {...this.props} accessibilityRole='link' target='_blank' style={style}/>)
    }
    return (<TouchableHighlight {...this.props} onPress={this.onPress} style={style}/>)
  }
}
