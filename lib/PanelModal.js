/**
 * Based on code from
 * https://medium.com/@dabit3/creating-an-animated-picker-for-react-native-a0785ad5a39c
 */
import React, {Component} from 'react'
import {
  Animated,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  View
} from 'react-native'
import {ResponsiveComponent} from 'react-native-responsive-ui'


const styles = StyleSheet.create({
  headerSelectorContainer: {
    flexDirection: 'row',
    borderTopColor: '#e2e2e2',
    borderTopWidth: 1,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth:1
  },
  titleSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  closeButton: {
    paddingRight:10,
    paddingTop:10,
    paddingBottom:10
  },
  closeButtonText: {
    color: '#027afe'
  }
})


class PanelModal extends ResponsiveComponent
{
  static defaultProps =
  {
    duration: 300
  }

  componentWillMount()
  {
    super.componentWillMount()

    this.setState({
      offSet: new Animated.Value(this.state.window.height),
      open: false
    })
  }

  componentWillUnmount()
  {
    super.componentWillUnmount()

    delete PanelModal.instance
  }

  componentDidMount()
  {
    const {duration} = this.props

    Animated.timing(this.state.offSet, {duration, toValue: 0}).start()

    PanelModal.instance = this
  }

  close: () =>
  {
    const {duration} = this.props
    const {onClose, offSet, window: {height: toValue}} = this.state

    Animated.timing(offSet, {duration, toValue}).start()

    this.setState({open: false})

    onClose()
  }

  show(title, body, onClose) {
    this.setState({body, onClose, open: true, title})
  }

  render()
  {
    const {body, offSet, open, title} = this.state

    if(!open) return null

    return (
      <TouchableWithoutFeedback onPress={this.close.bind(null, true)}>
        <View style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          opacity: 0,
          backgroundColor: 'transparent',
          width: '100%',
          width: offset
        }}/>
      </TouchableWithoutFeedback>
      <Animated.View style={{ transform: [{translateY: offSet}] }}>
        <View style={styles.headerSelectorContainer}>
          <View style={styles.titleSelectorContainer}>
            <Text>{title}</Text>
          </View>
          <View style={styles.closeButtonContainer}>
            <TouchableHighlight
              onPress={this.close}
              underlayColor="transparent"
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Choose</Text>
            </TouchableHighlight>
          </View>
        </View>
        {body}
      </Animated.View>
    )
  }
}


module.exports = PanelModal
