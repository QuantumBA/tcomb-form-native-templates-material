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


class PickerIOSModal extends Component
{
  render()
  {
    const {instance} = PanelModal
    if(!instance) throw new Error('PanelModal instance not mounted in app')

    const {data, enabled, itemStyle, prompt, selectedValue, style, testID} = this.props

    const {label = ''} = data.find(({key}) => key === selectedValue)

    const propsModal =
    {
      children: (
        <PickerIOS
          itemStyle={itemStyle}
          onValueChange={this.props.onValueChange}
          selectedValue={selectedValue}>
          {data.map(props => <PickerIOS.Item {...props}/>)}
        </PickerIOS>),
      title: prompt
    }

    return (
      <View
        style={[styles.container, style]}
        testID={testID}
        >
        <TouchableHighlight
          style={styles.button}
          underlayColor="transparent"
          onPress={() => instance.show(propsModal)}
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
