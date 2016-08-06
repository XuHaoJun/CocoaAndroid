import React, {Component} from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  DrawerLayoutAndroid,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {shouldComponentUpdate} from 'react-immutable-render-mixin'
import {Actions as RouterActions} from 'react-native-router-flux'
import Brick from '../components/Brick'
import DragExample from '../components/DragExample'
import * as actions from '../actions/omino'
import CustomToolbar from '../components/CustomToolbar'

class OminoEditorPage extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this)
    this.renderNavigationView = this.renderNavigationView.bind(this)
    this.handleDrawerTabClick = this.handleDrawerTabClick.bind(this)
    this.onIconClicked = this.onIconClicked.bind(this)
  }

  onIconClicked() {
    this.refs.drawer.openDrawer()
  }

  handleDrawerTabClick(pageName) {
    this.refs.drawer.closeDrawer();
    RouterActions[pageName]()
  }

  renderNavigationView() {
    return (
      <View
        style={[
        {
          flex: 1,
          flexDirection: 'column'
        }, {
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
        <TouchableOpacity
          style={styles.drawerContent}
          onPress={this.handleDrawerTabClick.bind(this, 'ominoEditorPage')}>
          <Text style={styles.drawerText}>
            Omino Editor
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerContent}
          onPress={this.handleDrawerTabClick.bind(this, 'deviceManagerPage')}>
          <Text style={styles.drawerText}>
            Device Manager
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerContent}
          onPress={this.handleDrawerTabClick.bind(this, 'aboutPage')}>
          <Text style={styles.drawerText}>
            About
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <DrawerLayoutAndroid
        ref='drawer'
        drawerWidth={Dimensions.get('window').width / 5 * 3}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this.renderNavigationView}>
        <StatusBar backgroundColor="black"/>
        <View style={{
          flex: 1,
          flexDirection: 'column'
        }}>
          <CustomToolbar
            title='OminoEditor'
            navIcon={require('../img/menu.png')}
            onIconClicked={this.onIconClicked}/>

          <Brick/>
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Welcome to React Native!
            </Text>
            <Text style={styles.instructions}>
              To get starred, edit index.android.js
            </Text>
            <Text></Text>
            <Text style={styles.instructions}>
              Double tap R on your keyboard to reload, {'\n'}
              Shake or press menu button for dev menu
            </Text>
            <Text>
              {this.props.omino.toString()}
            </Text>
            <Text>
              OS: {Platform.OS}
            </Text>
          </View>
        </View>
      </DrawerLayoutAndroid>
    )
  }
}

const styles = StyleSheet.create({
  children: {
    paddingLeft: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    //backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
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

// export default HelloWorld
function mapStateToProps(state, ownProps) {
  return {omino: state.get('omino')}
}

const ConnectedOminoEditorPage = connect(mapStateToProps, actions)(OminoEditorPage)
export default ConnectedOminoEditorPage
