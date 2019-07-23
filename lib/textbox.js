var React = require("react");
var {View, Text, StyleSheet} = require("react-native");
var {TextField} = require('react-native-material-textfield')
var stringTemplate = require('@foqum/string-template')
import CreatableSelect from 'react-select/creatable'

const calculateValue = (locals, calculation, values, key) => {
  calculation = stringTemplate(calculation, values, /\$\{([0-9a-zA-Z_\.]+)\}/g, '${')
  if (calculation.indexOf('${') >= 0) return
  let result
  try {
    if (/^[\d+.\-*\/\(\)]*$/.test(calculation)) {
      result = eval(calculation)
      result = result % 1 === 0 ? result : result.toFixed(2)
    } else if (calculation.includes('GMT+') && calculation.includes('-')){
      var [date_end, date_start] = calculation.split('-')
      date_end = new Date(date_end).getTime()
      date_start = new Date(date_start).getTime()
      result = ((date_end - date_start)/(24 * 60 * 60 * 1000)) + 1
    }
    if (result !== values[key]) locals.onChange(result)
  } catch {
      result = 'ERROR'
  }

}

const performCalculation = (locals) => {
  if (locals.path.length === 1) {
    // Normal Textfield
    const key = locals.path[0]
    if (locals.config.fields[key].hasOwnProperty('calculation')) {
      let calculation = locals.config.fields[key].calculation
      const values = locals.config.fields.form && locals.config.fields.form.props.value
      if (values) {
        calculateValue(locals, calculation, values, key)
      }
    }
  } else if (locals.path.length > 1) {
    // Textfield in a list
    let key = locals.path[0]
    let field = locals.config.fields[key]

    if (field.hasOwnProperty('item')) field = field['item']
    if (field.hasOwnProperty('fields')) field = field['fields']

    key = locals.path.slice(-1) // property key
    field = field[key] // the field, finally

    let localObject = locals.value

    if (typeof localObject === 'object'){
      while (typeof localObject === 'object') {
        localObject = Object.values(localObject)[0]
      }
      locals.onChange(localObject)
    }

    if (field.hasOwnProperty('value') && field.value !== '' && !field.hasOwnProperty('calculation')) {
      let defaultValue = field.value
      if (!locals.value && locals.value !== defaultValue) {
        locals.onChange(defaultValue)
      }
    }
    if (field.hasOwnProperty('calculation')) {
      const listName = locals.path[0], listIndex = locals.path[1]
      let calculation = field.calculation
      const values = locals.config.fields.form && locals.config.fields.form.props.value
      if (values && values[listName] && values[listName][listIndex]) {
        let myValues = Object.assign({}, values[listName][listIndex])
        Object.assign(myValues, values)
        Object.entries(myValues).forEach(([k, v]) => {
          if (v == undefined || v === '') delete myValues[k]
        })
        calculateValue(locals, calculation, myValues, key)
      }
    }
  }
}

function textbox(locals) {
  const styles = StyleSheet.create({
    error: {
      color: "rgb(220, 19, 38)",
      fontSize: 12,
      paddingVertical: 7
    },
  })

  performCalculation(locals)

  if (locals.hidden) {
    return null;
  }


  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var textboxStyle = stylesheet.textbox.normal;
  var textboxViewStyle = stylesheet.textboxView.normal;
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    textboxStyle = stylesheet.textbox.error;
    textboxViewStyle = stylesheet.textboxView.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  if (locals.editable === false) {
    textboxStyle = stylesheet.textbox.notEditable;
    textboxViewStyle = stylesheet.textboxView.notEditable;
  }

  if (locals.path.length > 0) {
    let changedValue
    const path = locals.path[0]
    let field = locals.config.fields[path]

    if (locals.path.length > 1) {
      const iterator = locals.path[1]
      const subPath = locals.path[2]
      const fieldID = `${subPath}ID`
      
      field = field.item.fields[subPath]
    }

    if (field && field.suggestions) {
      const cleanData = Object.entries(field.suggestions).map(([key, value]) => ({label: value, value}))
      const formattedLabel = locals.label ? (
        <Text style={controlLabelStyle}>{locals.label}</Text>
      ) : null
      const formattedHelp = locals.help ? (
        <Text style={helpBlockStyle}>{locals.help}</Text>
      ) : null
      const formattedError =
        locals.hasError && locals.value.length === 0 ? (
          <Text accessibilityLiveRegion="polite" style={[errorBlockStyle, styles.error]}>
            Required field
          </Text>
        ) : null
      return (
        <View style={formGroupStyle}>
          {formattedLabel}
          <CreatableSelect
            isClearable
            placeholder="Select or start typing..."
            options={cleanData}
            value={cleanData.find(item => item.value == locals.value)}
            onChange={change => locals.onChange(change.value)}
            formatCreateLabel={(inputVal) => { return `"${inputVal}"`}}
            styles={{ menuList: styles => ({ ...styles, maxHeight: 75 }) }}
          />
          {formattedHelp}
          {formattedError}
        </View>
      )
    }
}

  return (
    <View style={formGroupStyle}>
      <TextField
        error={(locals.hasError && locals.value.length === 0 && (locals.editable === true || locals.editable === undefined)) ? 'Required field' : locals.error}
        label={locals.label}
        ref="input"
        title={locals.help}
        nativeID={`id${locals.label && locals.label.replace(/\s/g, '')}`}
        autoCapitalize={locals.autoCapitalize}
        autoCorrect={locals.autoCorrect}
        autoFocus={locals.autoFocus}
        blurOnSubmit={locals.blurOnSubmit}
        clearButtonMode={locals.clearButtonMode}
        clearTextOnFocus={locals.clearTextOnFocus}
        editable={locals.editable}
        enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
        keyboardAppearance={locals.keyboardAppearance}
        keyboardType={locals.keyboardType}
        maxLength={locals.maxLength}
        multiline={locals.multiline}
        numberOfLines={locals.numberOfLines}
        onBlur={locals.onBlur}
        onChange={locals.onChangeNative}
        onChangeText={value => locals.onChange(value)}
        onContentSizeChange={locals.onContentSizeChange}
        onEndEditing={locals.onEndEditing}
        onFocus={locals.onFocus}
        onKeyPress={locals.onKeyPress}
        onLayout={locals.onLayout}
        onSelectionChange={locals.onSelectionChange}
        onSubmitEditing={locals.onSubmitEditing}
        placeholder={locals.placeholder || locals.editable === false ? ' ' : locals.placeholder}
        placeholderTextColor={locals.placeholderTextColor}
        returnKeyType={locals.returnKeyType}
        secureTextEntry={locals.secureTextEntry}
        selectTextOnFocus={locals.selectTextOnFocus}
        selectionColor={locals.selectionColor}
        selectionState={locals.selectionState}
        style={textboxStyle}
        tintColor={textboxStyle.borderColor}
        underlineColorAndroid={locals.underlineColorAndroid}
        value={locals.value}
      />
    </View>
  );
}

module.exports = textbox;
