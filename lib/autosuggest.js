import React, { Component } from 'react'
import Autosuggest          from 'react-autosuggest'

const theme = {
  container: {
    position: 'relative',
    flex: 1,
  },
  input: {
    width: '98%',
    height: 30,
    padding: '0px 7px',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    border: 0,
    borderBottom: '1px solid #aaa',
  },
  inputFocused: {
    outline: 'none'
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    top: 35,
    width: '99.5%',
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2,
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    height: 100,
    overflow: 'auto'
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px',
    color: 'black'
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd'
  }
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.value

const renderSuggestion = suggestion => (
  <span>
    {suggestion.label}
  </span>
)

class Suggest extends Component {

  constructor() {
    super()

    this.state = {
      value: '',
      suggestions: []
    }
  }

  UNSAFE_componentWillMount() {
    const { initialValue } = this.props
    if (initialValue) this.setState({ value: initialValue })
  }

  UNSAFE_componentWillReceiveProps({ initialValue }) {
    const { initialValue: oldInitValue } = this.props

    if (oldInitValue !== initialValue ) {
      this.setState({ value: initialValue })
    }
  }

  onChange = (event, { newValue }) => {
    const { onChange } = this.props
    this.setState({ value: newValue }, () => onChange(newValue)) 
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const { data } = this.props
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    return inputLength === 0 ? [] : data.filter(obj =>
      obj.label.toLowerCase().slice(0, inputLength) === inputValue
    )
  }

  // Autosuggest will call this function every time you need to update suggestions.
  onSuggestionsFetchRequested = ({ value }) => { this.setState({ suggestions: this.getSuggestions(value) }) }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => { this.setState({ suggestions: [] }) }

  render() {
    const { value, suggestions } = this.state
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      value,
      onChange: this.onChange
    }

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={theme}
      />
    )
  }
 
}

module.exports = Suggest