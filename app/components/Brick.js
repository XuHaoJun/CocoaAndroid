import React, {Component} from 'react'
import Svg, {
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Use,
  Defs,
  Stop
} from 'react-native-svg';
import {View, PanResponder, ART} from 'react-native'
const {Surface, Group, Shape} = ART
import {shouldComponentUpdate} from 'react-immutable-render-mixin'

class Brick extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bg: 'red',
      top: 0,
      left: 0
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: () => {
        console.log('---------onPanResponderGrant------')
        this._isFirst = true
        this._top = this.state.top
        this._left = this.state.left
        this.setState({bg: 'blue'})
      },
      onPanResponderMove: (evt, gs) => {
        //console.log(gs.dx + ' ' + gs.dy)
        console.log(gs.dx)
        this.setState({
          top: this._top + gs.dy,
          left: this._left + gs.dx
        })
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gs) => {
        this._top = 0;
        //console.log(gs.dx + ' ' + gs.dy)
        console.log(gs)
        this.setState({
          bg: 'red',
          top: 0,
          left: this._left + gs.dx
        })
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming
        // the JS responder. Returns true by default. Is currently only supported on
        // android.
        return true;
      }
    })
  }

  render() {
    return (
      <View style={{
        position: 'absolute'
      }}>
        <Svg height="500" width="500">
          <Circle
            {...this._panResponder.panHandlers}
            x={this.state.left}
            cx="50"
            cy="50"
            r="45"
            stroke="blue"
            strokeWidth="2.5"
            fill="green"/>
        </Svg>
      </View>
    )
  }
}

export default class Foo extends Component {
  constructor(props) {
    super(props)
    this._left = 0 + props.x
    this._top = 0 + props.y
    this.state = {
      x: this._left,
      y: this._top
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.x != this.state.x && this.state.y != nextState.y
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gs) => {
        console.log('-------onPanResponderGrant------')
        console.log(this._left + ' ' + this._top)
        console.log(gs)
        this._touchTarget = evt.nativeEvent.target;
      },
      onPanResponderMove: (evt, gs) => {
        console.log(this._left + ' ' + this._top)
        console.log(gs.dx + ' ' + gs.dy)
        let x = gs.dx + this._left
        let y = gs.dy + this._top
        if (this._touchTarget !== evt.nativeEvent.target) {
          y = y - 56
        }
        console.log(x + ' ' + y)
        this.setState({x: x, y: y})
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gs) => {
        // console.log(gs.dx + ' ' + gs.dy) this._skipCounter = 0 this.setState({x: 0,
        // y: 0})
        this._left = this.state.x
        this._top = this.state.y
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming
        // the JS responder. Returns true by default. Is currently only supported on
        // android.
        return true;
      }
    })
  }

  render() {
    return (
      <G {...this._panResponder.panHandlers} x={this.state.x} y={this.state.y}>
        <Ellipse cx="25" cy="25" rx="20" ry="10" fill={this.props.color}/>
        <Rect x="20" width="150" height="50" fill={this.props.color}/>
      </G>
    )
  }
}

Foo.propTypes = {
  x: React.PropTypes.number,
  y: React.PropTypes.number,
  color: React.PropTypes.string
}
Foo.defaultProps = {
  x: 0,
  y: 0,
  color: 'blue'
}

const BORDER_PATH = "M3.00191459,4 C1.34400294,4 0,5.34785514 0,7.00550479 L0,220.994495 C0,222.65439" +
    " 1.34239483,224 3.00191459,224 L276.998085,224 C278.655997,224 280,222.652145 28" +
    "0,220.994495 L280,7.00550479 C280,5.34561033 278.657605,4 276.998085,4 L3.001914" +
    "59,4 Z M3.00191459,4"

class Bfoo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0
    }
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: () => {
        console.log('-------onPanResponderGrant------')
      },
      onPanResponderMove: (evt, gs) => {
        //console.log(gs.dx + ' ' + gs.dy)
        console.log(gs.dy)
        this.setState({x: gs.dx, y: gs.dy})
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gs) => {
        console.log(gs.dx + ' ' + gs.dy)
        //this.setState({x: gs.dx, y: gs.dy})
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming
        // the JS responder. Returns true by default. Is currently only supported on
        // android.
        return true;
      }
    })
  }

  render() {
    return (
      <View
        {...this._panResponder.panHandlers}
        style={{
        position: 'absolute'
      }}>
        <Surface height="400" width="400">
          <Shape
            fill="rgba(255,0,0,0.5)"
            d={BORDER_PATH}
            x={this.state.x}
            y={this.state.y}/>
        </Surface>
      </View>
    )
  }
}

class Bar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0
    }
    this.setPosition = this.setPosition.bind(this)
    this.resetPosition = this.resetPosition.bind(this)
    this._onStartShouldSetResponder = this._onStartShouldSetResponder.bind(this)
  }

  setPosition(e) {
    console.log(e.nativeEvent.pageY)
    this.setState({
      x: this.state.x + (e.nativeEvent.pageX - this._drag.x),
      y: this.state.y + (e.nativeEvent.pageY - this._drag.y)
    });
    this._drag.x = e.nativeEvent.pageX;
    this._drag.y = e.nativeEvent.pageY;
  }

  resetPosition(e) {
    this._dragging = false;
    this.setState({x: 0, y: 0})
  }

  _onStartShouldSetResponder(e) {
    this._dragging = true;
    this._drag = {
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY
    }
    return true;
  }

  _onMoveShouldSetResponder(e) {
    return true;
  }

  render() {
    return (
      <Svg height="500" width="500" preserveAspectRatio="none">
        <Circle
          onResponderMove={this.setPosition}
          onResponderRelease={this.resetPosition}
          onStartShouldSetResponder={this._onStartShouldSetResponder}
          onMoveShouldSetResponder={this._onMoveShouldSetResponder}
          x={this.state.x}
          y={this.state.y}
          cx="50"
          cy="50"
          r="45"
          stroke="blue"
          strokeWidth="2.5"
          fill="green"/>
      </Svg>
    )
  }
}
