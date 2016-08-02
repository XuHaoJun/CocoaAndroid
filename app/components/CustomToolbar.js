import React, { Component } from 'react'
import { Platform, View, StyleSheet, ToolbarAndroid, Image, TouchableOpacity, Text } from 'react-native'
import NavigationBar from 'react-native-navbar';
import { Actions } from 'react-native-router-flux'

class CustomToolbar extends Component {
  constructor (props) {
    super(props)
    this.onIconClicked = this.onIconClicked.bind(this)
    this.renderLeftButton = this.renderLeftButton.bind(this)
  }

  onIconClicked() {
    if (this.props.onIconClicked) {
      this.props.onIconClicked();
    } else {
      Actions.pop()
    }
  }

  renderLeftButton() {
    return (
      <TouchableOpacity onPress={this.onIconClicked}
          style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
          <Image
              source={this.props.navIcon ? this.props.navIcon : require('../img/icon_left.png')}
          />
      </TouchableOpacity>
    )
  }

  render() {
    if (Platform.OS === 'android') {
      return (
        <ToolbarAndroid
            onIconClicked={this.onIconClicked}
            style={styles.toolbar}
            titleColor='#fff'
            title={this.props.title ? this.props.title : 'default title'}
            navIcon={this.props.navIcon ? this.props.navIcon : require('../img/icon_left.png')} />
      )
    }
    return (
      <NavigationBar
          leftButton={this.renderLeftButton()}
          style={styles.toolbar}
          title={{
              title: this.props.title ? this.props.title : 'default title',
              tintColor: '#fff'
          }}
      />
    )
  }
}

let styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#FF0000',
    height: 56
  }
})

export default CustomToolbar
