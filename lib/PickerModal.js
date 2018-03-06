/**
 * Based on code from
 * https://medium.com/@dabit3/creating-an-animated-picker-for-react-native-a0785ad5a39c
 */
import React, {Component}                                        from 'react'
import {
  Animated,
  Platform,
  Picker,
  PickerIOS,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
}                                                                from 'react-native'
import {ResponsiveComponent}                                     from 'react-native-responsive-ui'


const ANIMATION_DURATION = 300


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  button: {
   marginTop:25,
    marginBottom:25
  },
  closeButtonContainer: {
   flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopColor: '#e2e2e2',
    borderTopWidth: 1,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth:1
  },
  closeButton: {
   paddingRight:10,
    paddingTop:10,
    paddingBottom:10
  },
  buttonText: {
   textAlign: 'center'
  },
  closeButtonText: {
   color: '#027afe'
  }
})


class Panel extends ResponsiveComponent
{
  componentWillMount()
  {
    super.componentWillMount()
    this.setState({offSet: new Animated.Value(this.state.window.height)})
  }

  componentDidMount()
  {
    Animated.timing(this.state.offSet, {
      duration: ANIMATION_DURATION,
      toValue: 100
    }).start()
  }

  close()
  {
    const {offSet, window} = this.state

    Animated.timing(offSet, {
      duration: ANIMATION_DURATION,
      toValue: window.height
    }).start(() => this.props.onClose())
  }

  render()
  {
    const {children, itemStyle, onValueChange, prompt, selectedValue} = this.props

    return (
      <Animated.View style={{ transform: [{translateY: this.state.offSet}] }}>
        <View style={styles.closeButtonContainer}>
          <Text>{prompt}</Text>
          <TouchableHighlight 
            onPress={() => this.close()}
            underlayColor="transparent"
            style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Choose</Text>
          </TouchableHighlight>
        </View>
        <PickerIOS
          itemStyle={itemStyle}
          onValueChange={onValueChange}
          selectedValue={selectedValue}>
          {children}
        </PickerIOS>
      </Animated.View>
    )
  }
}

class PickerIOSModal extends Component
{
  componentWillMount() {
    this.setState({openModal: false})
  }

  render()
  {
    const {
      data, enabled, itemStyle, onValueChange, prompt, selectedValue, style,
      testID
    } = this.props

    const {label = ''} = data

    return (
      <View>
        <View
          style={[styles.container, style]}
          testID={testID}
          >
          <TouchableHighlight
            style={styles.button}
            underlayColor="transparent"
            onPress={() => this.setState({openModal: true})}
          >
            <Text style={styles.buttonText}>{selectedValue}</Text>
          </TouchableHighlight>
        </View>
        {
          this.state.openModal
          ? <Panel
              onClose={() => this.setState({openModal: false})}
              itemStyle={itemStyle}
              onValueChange={onValueChange}
              prompt={prompt}
              selectedValue={selectedValue}
              >
              {data.map(props => <PickerIOS.Item {...props}/>)}
            </Panel>
          : null
        }
      </View>
    )
  }
}


function PickerModal({data = [], enabled, itemStyle, mode = 'dialog',
  onValueChange, prompt, selectedValue, style, testID})
{
  style = [{
    borderBottomColor: 'rgba(0,0,0, 0.12)', // selectStyle.color when focused
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0
  }, style]

  if(Platform.OS === 'ios' && mode === 'dialog')
    return <PickerIOSModal
      data={data}
      enabled={enabled}
      itemStyle={itemStyle}
      onValueChange={onValueChange}
      prompt={prompt}
      selectedValue={selectedValue}
      style={style}
      testID={testID}
    />

  return (
    <Picker
      enabled={enabled}
      itemStyle={itemStyle}
      mode={mode}
      onValueChange={onValueChange}
      prompt={prompt}
      selectedValue={selectedValue}
      style={style}
      testID={testID}
      >
      {data.map(props => <Picker.Item {...props}/>)}
    </Picker>
  )
}


module.exports = PickerModal