var React = require("react");
var {Text, View, StyleSheet} = require("react-native");
// var Autosuggest = require("react-autosuggest");
var Autosuggest = require("./autosuggest")

const Picker = require('pickerdialog')

function select(locals) {
  let {enabled, error, hasError, help, hidden, itemStyle, label,
    onChange, options, prompt, stylesheet, value} = locals
  if (hidden) {
    return null;
  }
  const styles = StyleSheet.create({
    error: {
      color: "rgb(220, 19, 38)",
      fontSize: 12,
      paddingVertical: 7
    },
  });
  const {controlLabel, errorBlock, formGroup, helpBlock, pickerContainer,
    select} = stylesheet;

  var formGroupStyle = formGroup.normal;
  var controlLabelStyle = controlLabel.normal;
  var selectStyle = Object.assign(
    {},
    select.normal,
    pickerContainer.normal
  );
  var helpBlockStyle = helpBlock.normal;
  var errorBlockStyle = errorBlock;

  if (hasError) {
    formGroupStyle = formGroup.error;
    controlLabelStyle = controlLabel.error;
    selectStyle = select.error;
    helpBlockStyle = helpBlock.error;
  }

  const formattedLabel = label ? (
    <Text style={controlLabelStyle}>{label}</Text>
  ) : null;
  const formattedHelp = help ? (
    <Text style={helpBlockStyle}>{help}</Text>
  ) : null;
  const formattedError =
    hasError && value.length === 0 ? (
      <Text accessibilityLiveRegion="polite" style={[errorBlockStyle, styles.error]}>
        Required field
      </Text>
    ) : null;

  const data = options.map(({value, text: label}) => ({label, value}))

  if(prompt)
  {
    const data0 = data[0]

    if(data0.value === '' && data0.label === '-') data0.label = prompt
  }

  const cleanData = data.filter(obj => !Object.keys(obj).some((key) => obj[key] == null))

  if (locals.path.length > 0) {
    let changedValue
    const path = locals.path[0]
    let field = locals.config.fields[path]

    if (locals.path.length > 1) {
      const iterator = locals.path[1]
      const subPath = locals.path[2]
      const fieldID = `${subPath}ID`
      
      field = field.item.fields[subPath]

      if (field.isObject) {
        changedValue = field.form && field.form.props.value[path][iterator][subPath] && field.form.props.value[path][iterator][subPath][fieldID]
        if (value !== changedValue && (changedValue != undefined)) onChange(changedValue)
      }
    }

    if (field.autosuggest) {
      return (
        <View style={formGroupStyle}>
          {formattedLabel}
          <Autosuggest 
            data={cleanData} 
            initialValue={value}
            onChange={onChange} />
        </View>
      )
    }
  }

  return (
    <View style={formGroupStyle}>
      {formattedLabel}
      <Picker
        enabled={enabled}
        itemStyle={itemStyle}
        onValueChange={onChange}
        prompt={label}
        selectedValue={value}
        style={selectStyle}
        // testID={testID}
      >
        {cleanData.map(props => <Picker.Item {...props} key={props.value} label={String(props.label)}/>)}
      </Picker>
      {formattedHelp}
      {formattedError}
    </View>
  );
}

module.exports = select;
