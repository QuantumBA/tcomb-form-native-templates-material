var React = require("react");
var {KeyboardAvoidingView, Platform, Text, View, FlatList} = require("react-native");

function struct(locals) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var fieldsetStyle = stylesheet.fieldset;
  var controlLabelStyle = stylesheet.controlLabel.normal;

  if (locals.hasError) {
    controlLabelStyle = stylesheet.controlLabel.error;
  }

  var label = locals.label ? (
    <Text style={controlLabelStyle}>{locals.label}</Text>
  ) : null;
  var error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={stylesheet.errorBlock}>
        {locals.error}
      </Text>
    ) : null;

  var rows = locals.order.map(function(name) {
    return locals.inputs[name];
  });

  const Component = Platform.OS === 'ios' ? KeyboardAvoidingView : View

  return (
    <Component behavior="position" style={label && fieldsetStyle}>
      {label}
      {error}
      <FlatList 
        initialNumToRender={rows.length}
        data={rows}
        renderItem={({item}) => item}
        CellRendererComponent={({ children, index, style, ...props }) => {
          const cellStyle = [
              style,

              // Set each item zIndex lower than the previous one to prevent overlapping
              { zIndex: 9999999 - index }
          ]
          return (
              <View style={cellStyle} index={index} {...props}>
                  {children}
              </View>
          )
        }}
      />
    </Component>
  );
}

module.exports = struct;
