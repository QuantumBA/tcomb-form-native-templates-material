var React = require("react");
var {View, Text} = require("react-native");
var {Checkbox} = require("react-native-material-ui");

function checkbox(locals) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var checkboxStyle = stylesheet.checkbox.normal;
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    checkboxStyle = stylesheet.checkbox.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  var label = locals.label ? (
    <Text style={controlLabelStyle}>{locals.label}</Text>
  ) : null;
  var help = locals.help ? (
    <Text style={helpBlockStyle}>{locals.help}</Text>
  ) : null;
  var error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null;

  return (
    <View style={formGroupStyle}>
      <Checkbox
        label={label}
        value={locals.value.toString()}
        checked={locals.value}
        disabled={locals.disabled}
        onCheck={value => locals.onChange(value)}
        accessibilityLabel={locals.label}
        ref="input"
        style={checkboxStyle}
      />
      {help}
      {error}
    </View>
  );
}

module.exports = checkbox;
