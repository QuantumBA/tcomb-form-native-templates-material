/**
 * Based on code from
 * https://medium.com/@dabit3/creating-an-animated-picker-for-react-native-a0785ad5a39c
 */
import React, {Component}                                        from 'react'
import {Animated, Platform: {OS}, Picker, PickerIOS, StyleSheet} from 'react-native'
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
  componentWillMount: function()
  {
    this.setState(offSet: new Animated.Value(this.state.window.height))
  }

  componentDidMount()
  {
    Animated.timing(this.state.offSet, {
      duration: ANIMATION_DURATION,
      toValue: 100
    }).start()
  },

  close()
  {
    const {offSet, window: {height}} = this.state

    Animated.timing(offSet, {
      duration: ANIMATION_DURATION,
      toValue: height
    }).start(this.props.onClose)
  },

  render()
  {
    const {children, itemStyle, onValueChange, prompt, selectedValue} = this.props

    return (
      <Animated.View style={{ transform: [{translateY: this.state.offSet}] }}>
        <View style={styles.closeButtonContainer}>
          <Text>{prompt}</Text>
          <TouchableHighlight onPress={this.close}
            underlayColor="transparent" style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Choose</Text>
          </TouchableHighlight>
        </View>
        <PickerIOS
          itemStyle={itemStyle}
          onValueChange={onValueChange}>
          selectedValue={selectedValue}
          {children}
        </PickerIOS>
      </Animated.View>
    )
  }
}

class PickerIOSModal extends Component
{
  setOpen = open => this.setState({open})

  render()
  {
    const {
      data, enabled, itemStyle, onValueChange, prompt, selectedValue, style,
      testID
    } = this.props

    const [label = ''] = data

    return (
      <View
        style={[styles.container, style]}
        testID={testID}
        >
        <TouchableHighlight style={styles.button} underlayColor="transparent"
          onPress={enabled && this.setOpen}>
          <Text style={styles.buttonText}>{label}</Text>
        </TouchableHighlight>
        {
          this.state.open
          ? <Panel
              onClose={this.setOpen}
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
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    borderLeftStyle: 'none',
    borderRightStyle: 'none',
    borderTopStyle: 'none'
  }, style]

  if(OS === 'ios' && mode === 'dialog')
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
