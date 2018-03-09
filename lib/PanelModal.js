/**
 * Based on code from
 * https://medium.com/@dabit3/creating-an-animated-picker-for-react-native-a0785ad5a39c
 */
import React, {Component} from 'react'
import {
  Animated,
  Text,
  TouchableHighlight,
  StyleSheet,
  View
} from 'react-native'
import {ResponsiveComponent} from 'react-native-responsive-ui'


const duration = 300


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
    PanelModal.instance = this

    Animated.timing(this.state.offSet, {duration, toValue: 0}).start()
  }

  close: () =>
  {
    const {offSet, window: {height: toValue}} = this.state

    Animated.timing(offSet, {duration, toValue}).start()

    this.setState({open: false})
  }

  show(title, body) {
    this.setState({body, open: true, title})
  }

  render()
  {
    const {body, open, title} = this.state

    if(!open) return null

    return (
      <Animated.View style={{ transform: [{translateY: this.state.offSet}] }}>
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
