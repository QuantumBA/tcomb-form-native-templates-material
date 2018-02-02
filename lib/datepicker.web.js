import React from "react";
import {View, Text} from "react-native";


function input(type, {disabled, maximumDate, minimumDate, onChange, onPress,
  value})
{
  if(type === 'datetime') type = 'datetime-local'

  return <input
    disabled={disabled}
    max={type !== 'time' && maximumDate}
    min={type !== 'time' && minimumDate}
    onChange={onChange}
    onClick={onPress}
    ref="input"
    type={type}
    value={value}
  />
}


function datepicker(locals) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  // Setup the picker mode
  var datePickerMode = locals.mode;
  if(!datePickerMode) datePickerMode = 'date'
  if (
    datePickerMode !== "date" &&
    datePickerMode !== "time" &&
    datePickerMode !== "datetime"
  ) {
    throw new Error(`Unrecognized date picker format ${datePickerMode}`);
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
      <View>
        {label}
        {input(datePickerMode, locals)}
      </View>
      {help}
      {error}
    </View>
  );
}

module.exports = datepicker;
