var React = require("react");
var {View, Text} = require("react-native");
var {Dropdown} = require('react-native-material-dropdown')

function select({enabled, error, hasError, help, hidden, itemStyle, label,
  onChange, options, stylesheet, value}) {
  if (hidden) {
    return null;
  }

  var stylesheet = stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var selectStyle = Object.assign(
    {},
    stylesheet.select.normal,
    stylesheet.pickerContainer.normal
  );
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    selectStyle = stylesheet.select.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  var help = help ? (
    <Text style={helpBlockStyle}>{help}</Text>
  ) : null;

  var data = options.map(({ value, text }) => ({value, label: text}));

  return (
    <View style={formGroupStyle}>
      <Dropdown
        label={label}
        error={hasError && error}
        data={data}
        value={value}
        onChangeText={onChange}
        disabled={enabled === false}
        itemTextStyle={itemStyle}
        pickerStyle={selectStyle}
        ref="input"
      />
      {help}
    </View>
  );
}

module.exports = select;
