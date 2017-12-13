var React = require("react");
var {View, Text} = require("react-native");
var {Dropdown} = require('react-native-material-dropdown')

function select(locals) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var selectStyle = Object.assign(
    {},
    stylesheet.select.normal,
    stylesheet.pickerContainer.normal
  );
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    selectStyle = stylesheet.select.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  var help = locals.help ? (
    <Text style={helpBlockStyle}>{locals.help}</Text>
  ) : null;

  var data = locals.options.map(({ value, text }) => ({value, label: text}));

  return (
    <View style={formGroupStyle}>
      <Dropdown
        label={locals.label}
        error={locals.hasError && locals.error}
        data={data}
        value={locals.value}
        onChangeText={locals.onChange}
        disabled={locals.enabled === false}
        itemTextStyle={locals.itemStyle}
        pickerStyle={selectStyle}
        ref="input"
      />
      {help}
    </View>
  );
}

module.exports = select;
