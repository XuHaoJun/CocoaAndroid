import React, {Component, PropTypes} from 'react';
import {
  Text,
  StyleSheet,
  TouchableHighlight,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  InteractionManager
} from 'react-native'
import Drawer from 'react-native-drawer';
import TabView from './TabView';
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import Button from 'react-native-button'
import DrawerLayoutAndroid from 'react-native-drawer-layout'

class DrawerContent extends Component {
  constructor(props) {
    super(props)
    this.handleButtonPress = this.handleButtonPress.bind(this)
  }

  handleButtonPress() {
    const drawer = this.props.drawer;
    InteractionManager.runAfterInteractions(() => {
      drawer.close()
    })
  }

  render() {
    const drawer = this.props.drawer;
    return (
      <View
        style={[
        styles.container, {
          backgroundColor: '#fcfcfc'
        }
      ]}>
        <Image
          style={{
          width: Dimensions.get('window').width / 5 * 3,
          height: 120,
          justifyContent: 'flex-end',
          paddingBottom: 10
        }}
          source={require('../img/kiki.jpg')}>
          <Text
            style={{
            fontSize: 20,
            textAlign: 'left',
            color: '#fcfcfc',
            marginLeft: 10
          }}>
            Cocoa
          </Text>
        </Image>
        <TouchableOpacity style={styles.drawerContent} onPress={this.handleButtonPress}>
          <Text style={styles.drawerText}>
            Omino IDE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerContent} onPress={this.handleButtonPress}>
          <Text style={styles.drawerText}>
            About
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const DrawerContentHelp = (props, context) => {
  const drawer = context.drawer;
  return (<DrawerContent drawer={drawer}/>)
}

DrawerContentHelp.contextTypes = {
  drawer: React.PropTypes.object
};

DrawerContentHelp.propTypes = {
  name: PropTypes.string,
  sceneStyle: View.propTypes.style,
  title: PropTypes.string
};

export default class extends Component {
  render() {
    const state = this.props.navigationState;
    const children = state.children;
    let navigationView = (
      <View style={{
        flex: 1,
        backgroundColor: '#fff'
      }}>
        <Text
          style={{
          margin: 10,
          fontSize: 15,
          textAlign: 'left'
        }}>I'm in the Drawer!</Text>
      </View>
    )
    return (
      <DrawerLayoutAndroid
        ref="navigation"
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerWidth={Dimensions.get('window').width / 5 * 3}
        onDrawerOpen={() => Actions.refresh({key: state.key, open: true})}
        onDrawerClose={() => Actions.refresh({key: state.key, open: false})}
        renderNavigationView={() => navigationView}>
        <DefaultRenderer
          navigationState={children[0]}
          onNavigate={this.props.onNavigate}/>
      </DrawerLayoutAndroid>
    )
  }

  render2() {
    const state = this.props.navigationState;
    const children = state.children;
    return (
      <Drawer
        ref="navigation"
        tweenDuration={100}
        open={state.open}
        onOpen={() => Actions.refresh({key: state.key, open: true})}
        onClose={() => Actions.refresh({key: state.key, open: false})}
        type="overlay"
        content={< DrawerContentHelp />}
        tapToClose={true}
        openDrawerOffset={0.4}
        panCloseMask={0.4}
        negotiatePan={true}
        styles={drawerStyles}>
        <DefaultRenderer
          navigationState={children[0]}
          onNavigate={this.props.onNavigate}/>
      </Drawer>
    );
  }
}

const drawerStyles = {
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3
  },
  main: {
    paddingLeft: 3
  }
}

const styles = StyleSheet.create({
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
