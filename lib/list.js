var React = require("react");
var {View, Text, StyleSheet, FlatList} = require("react-native");
var {Button, ListItem} = require("react-native-material-ui");
var {TextField} = require('react-native-material-textfield')

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
      divider
      style={StyleSheet.create({
        container: {
          height: '100%',
          marginTop: 10
        }
      })}
      key={item.key}
      centerElement={item.input}
      rightElement={item.input.props.options.editable === false ? null: renderButtonGroup(item.buttons, stylesheet)}
    />
  );
}

function reduceValues(op, values) {
  if (op === 'sum') {
    return values.reduce((x,y) => x + y, 0)
  } else if (op === 'average') {
    const sum = values.reduce((x,y) => x + y, 0)
    return sum / values.length
  }
}

function renderCalculatedFields(locals) {
  const key = locals.path[0]
  const fields = locals.config.fields
  const valuesObj = locals.value
  const textFields = []
  const reducers = (fields && fields[key].reduce) || []
  reducers.forEach(reducer => {
    const values = valuesObj.filter(x => x).map(x => parseFloat(x[reducer.field]))
    if (values.length === 0) return
    textFields.push(
      <TextField
       label={reducer.label}
       value={reduceValues(reducer.operation, values).toFixed(2)}
       editable={false}
       style={locals.stylesheet.textbox.notEditable}
      />
    )
  })
  return textFields
}


function list(locals) {

  if (locals.hidden) {
    return null;
  }

  var editable = true
  if (locals.items[0])
   editable = locals.items[0].input.props.options.editable !== false
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

  var addButton = locals.add && editable ? renderRowButton(locals.add, stylesheet, ownStyles.buttonGroup) : null;

  if (locals.config.fields[locals.path[0]].editable === false) addButton = null

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
      {renderCalculatedFields(locals)}
    </View>
  );
}



module.exports = list;

