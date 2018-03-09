/**
 * Based on code from
 * https://medium.com/@dabit3/creating-an-animated-picker-for-react-native-a0785ad5a39c
 */
import React, {Component} from 'react'
import {
  Animated,
  Picker,
  PickerIOS,
  Platform,
  Text,
  TouchableHighlight,
  StyleSheet,
  View
} from 'react-native'

import PanelModal from './PanelModal'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  button: {
    marginTop:25,
    marginBottom:25
  },
  buttonText: {
    textAlign: 'center'
  },
})


function createItem(props)
{
  return <PickerIOS.Item {...props}/>
}


class PickerIOSModal extends Component
{
  _onClose: cancelled =>
  {
    if(cancelled) return

    this.props.onValueChange(this.state.value)
  }

  _onPress: () =>
  {
    const {instance} = PanelModal
    if(!instance) throw new Error('PanelModal instance not mounted in app')

    this.setState({value: undefined})

    const {data, itemStyle, prompt, selectedValue} = this.props

    const body =
    (
      <PickerIOS
        itemStyle={itemStyle}
        onValueChange={this._onValueChange}
        selectedValue={selectedValue}>
        {data.map(createItem)}
      </PickerIOS>
    )

    instance.show(prompt, body, 'Choose', this._onClose)
  }

  _onValueChange: value => this.setState({value})

  render()
  {
    const {data, enabled, selectedValue, style, testID} = this.props

    const {label = ''} = data.find(({key}) => key === selectedValue)

    return (
      <View
        style={[styles.container, style]}
        testID={testID}
        >
        <TouchableHighlight
          style={styles.button}
          underlayColor="transparent"
          onPress={this._onPress}
        >
          <Text style={styles.buttonText}>{label}</Text>
        </TouchableHighlight>
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
