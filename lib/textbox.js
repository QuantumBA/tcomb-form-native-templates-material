var React = require("react");
var {View, Text} = require("react-native");
var {TextField} = require('react-native-material-textfield')
var stringTemplate = require('string-template')

const calculateValue = (locals, calculation, values, key) => {
  calculation = stringTemplate(calculation, values, /\$\{([0-9a-zA-Z_\.]+)\}/g, '${')
  if (calculation.indexOf('${') < 0 && eval(calculation) !== values[key]) {
    locals.onChange(eval(calculation))
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
    if (field.hasOwnProperty('calculation')) {
      const listName = locals.path[0], listIndex = locals.path[1]
      let calculation = field.calculation
      const values = locals.config.fields.form && locals.config.fields.form.props.value
      if (values && values[listName] && values[listName][listIndex]) {
        let myValues = Object.assign({}, values[listName][listIndex])
        Object.assign(myValues, values)
        Object.entries(myValues).forEach(([k, v]) => {
          if (!v) delete myValues[k]
        })
        calculateValue(locals, calculation, myValues, key)
      }
    }
  }
}

function textbox(locals) {
  if (locals.hidden) {
    return null;
  }

  performCalculation(locals)

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

  return (
    <View style={formGroupStyle}>
      <TextField
        error={locals.error}
        label={locals.label}
        ref="input"
        title={locals.help}
        nativeID={`id${locals.label.replace(/\s/g, '')}`}
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

