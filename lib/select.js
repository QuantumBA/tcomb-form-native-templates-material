var React = require("react");
var {Text, View, StyleSheet} = require("react-native");

const Picker = require('pickerdialog')


function select({enabled, error, hasError, help, hidden, itemStyle, label,
  onChange, options, prompt, stylesheet, value}) {
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
