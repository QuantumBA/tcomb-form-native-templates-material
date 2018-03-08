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
  componentWillMount() {
    this.setState({openModal: false})
    this.refPanel = global.refPanel
  }

  render()
  {
    const {
      data, enabled, itemStyle, onValueChange, prompt, selectedValue, style,
      testID
    } = this.props

    const {label = ''} = data.find(element => element.key === selectedValue)

    const propsModal = {
      itemStyle,
      onValueChange,
      prompt,
      selectedValue,
      children : {data.map(props => <PickerIOS.Item {...props}/>)},
    }

    return (
      <View>
        <View
          style={[styles.container, style]}
          testID={testID}
          >
          <TouchableHighlight
            style={styles.button}
            underlayColor="transparent"
            onPress={() => this.refPanel.show(propsModal))}
          >
            <Text style={styles.buttonText}>{label}</Text>
          </TouchableHighlight>
        </View>
        {
          this.state.openModal
          ? this.refPanel.show(propsModal) 
          <PanelModal
              onClose={() => this.setState({openModal: false})}
              itemStyle={itemStyle}
              onValueChange={onValueChange}
              prompt={prompt}
              selectedValue={selectedValue}
              >
              {data.map(props => <PickerIOS.Item {...props}/>)}
            </PanelModal>
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
module.exports = PanelModal