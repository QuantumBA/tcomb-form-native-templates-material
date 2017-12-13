import FlatList from 'FlatList'

var React = require("react");
var {View, Text} = require("react-native");
var {Button, ListItem} = require("react-native-material-ui");


function renderRowButton(button, stylesheet, style) {
  return (
    <Button
      key={button.type}
      style={{container: [stylesheet.button, style], text: stylesheet.buttonText}}
      onPress={button.click}
      text={button.label}
    />
  );
}

function renderButtonGroup(buttons, stylesheet) {
  return (
    <View style={{ flexDirection: "row" }}>
      {buttons.map(button =>
        renderRowButton(button, stylesheet, { width: 50 })
      )}
    </View>
  );
}

function renderRow(item, stylesheet) {
  return (
    <ListItem
      key={item.key}
      centerElement={item.input}
      rightElement={renderButtonGroup(item.buttons, stylesheet)}
    />
  );
}


function list(locals) {
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

  var addButton = locals.add ? renderRowButton(locals.add, stylesheet) : null;

  return (
    <View style={fieldsetStyle}>
      {label}
      {error}
      <FlatList
        data={locals.items}
        renderItem={function({item}) {
          return item.buttons.length === 0
            ? <ListItem key={item.key} centerElement={item.input}/>
            : renderRow(item, stylesheet);
        }}
      />
      {addButton}
    </View>
  );
}


module.exports = list;
