var React = require("react");
var {Text, View} = require("react-native");

const Picker = require('pickerdialog')


function select({enabled, error, hasError, help, hidden, itemStyle, label,
  onChange, options, prompt, stylesheet, value}) {
  if (hidden) {
    return null;
  }

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
    hasError && error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {error}
      </Text>
    ) : null;

  const data = options.map(({value, text: label}) => ({label, value}))

  if(prompt)
  {
    const data0 = data[0]

    if(data0.value === '' && data0.label === '-') data0.label = prompt
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
        {data.map(props => <Picker.Item {...props} key={props.value} label={String(props.label)}/>)}
      </Picker>
      {formattedHelp}
      {formattedError}
    </View>
  );
}

module.exports = select;
