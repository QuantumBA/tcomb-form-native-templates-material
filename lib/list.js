import { FlatList } from 'react-native-web-lists'

var React = require("react");
var {View, Text, StyleSheet} = require("react-native");
var {Button, ListItem} = require("react-native-material-ui");

const ownStyles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    marginTop: 10,
    alignSelf: 'center',
  },
  containerButton: {
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5
  },
  textButton: {
    marginLeft: -8,
    padding: 0,
  }
})


function renderRowButton(button, stylesheet, style, textStyle) {
  
  let icon = null
  if(button.label === '✘') icon = "delete"
  if(button.label === '↑') icon = "arrow-drop-up"
  if(button.label === '↓') icon = "arrow-drop-down"
  return (
    <Button
      key={button.type}
      style={{container: [stylesheet.button, style], text: [stylesheet.buttonText, textStyle]}}
      onPress={button.click}
      text={icon ? '' : button.label}
      icon={icon}
    />
  );
}

function renderButtonGroup(buttons, stylesheet) {
  return (
    <View style={{ flexDirection: "row" }}>
      {buttons.map(button =>
        renderRowButton(button, stylesheet, ownStyles.containerButton, ownStyles.textButton)
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

  var addButton = locals.add ? renderRowButton(locals.add, stylesheet, ownStyles.buttonGroup) : null;

  return (
    <View style={fieldsetStyle}>
      {label}
      {error}
      <FlatList
        data={locals.items}
        style={{padding: 20}}
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
