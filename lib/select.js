var React = require("react");
var {Picker, Text, View} = require("react-native");

function select({enabled, error, hasError, help, hidden, itemStyle, label,
  onChange, options, stylesheet, value}) {
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

  const data = options.map(({value, text}) => ({value, label: text}));

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
        {data.map(props => <Picker.Item {...props}/>)}
      </Picker>
      {formattedHelp}
      {formattedError}
    </View>
  );
}

module.exports = select;
