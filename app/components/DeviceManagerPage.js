
import React, { Component, PropTypes } from 'react'
import { View, Text, ListView } from 'react-native'
import CustomToolbar from './CustomToolbar'

export default class DeviceManagerPage extends Component {
  constructor(props) {
    super(props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state =  {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    }
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <CustomToolbar title="Device Manager" />
        <View>
          <Text style={{fontSize: 20}}> Current connecting device: ???</Text>
        </View>
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData}</Text>}
          />
        </View>
      </View>
    )
  }
}
