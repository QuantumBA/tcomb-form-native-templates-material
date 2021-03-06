import React from "react";
import {View, Text, StyleSheet} from "react-native";


function input(type, {disabled, maximumDate, minimumDate, onChange, onPress,
  value})
{
  if(type === 'datetime') type = 'datetime-local'
  if(value === '') onChange(undefined)
  else if(typeof value === 'string') {
    value = new Date(value)
    if (!isNaN(value)) onChange(value)
  }

  return <input
    disabled={disabled}
    max={type !== 'time' && maximumDate}
    min={type !== 'time' && minimumDate}
    onChange={e => onChange(e.target.value ? new Date(e.target.value) : null)}  
    onClick={onPress}
    ref="input"
    type={type}
    style={{borderWidth: 0, borderBottomWidth: 1, borderBottomColor: 'lightgray', color:'#636363'}}
    value={isNaN(value) || !value ? undefined : value.toISOString().substring(0, 10)}
  />
}

function setDisabled(locals) { 
  const parentPath = locals.path[0]
  let editable
  if (locals.path.length > 1) {
    const path = locals.path[2]
    editable = locals.config.fields[parentPath].item.fields[path].editable
  } else {
    editable = locals.config.fields[parentPath].editable
  }
  if (editable === false) locals.disabled = true
}

function datepicker(locals) {
  if (locals.hidden) {
    return null; 
  }

  const styles = StyleSheet.create({
    error: {
      color: "rgb(220, 19, 38)",
      fontSize: 12,
      paddingVertical: 7
    },
  });

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
    locals.hasError ? (
      <Text accessibilityLiveRegion="polite" style={[errorBlockStyle, styles.error]}>
        Required field
      </Text>
    ) : null;

  setDisabled(locals)

  return (
    <View style={formGroupStyle}>
      <View style={{ maxWidth: 130 }}>
        {label}
        {input(datePickerMode, locals)}
      </View>
      {help}
      {error}
    </View>
  );
}

module.exports = datepicker;
