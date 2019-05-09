import React, {Component} from 'react'

class Chatbar extends Component {
  constructor() {
    super()

    this.state = {
      content:'',
      name: 'Bob',
      savedName: 'Bob'
    }

    this.onContent = this.onContent.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onNameContent = this.onNameContent.bind(this)
    this.onSubmitName = this.onSubmitName.bind(this)
    this.resetName = this.resetName.bind(this)

  }

  onNameContent(event) {
    this.setState({
      name: event.target.value
    })
  }

  onSubmitName(event) {
    if (event.key === 'Enter'){
      this.props.submitName(this.state.name)
      this.setState({
        savedName: this.state.name
      })
    }
  }

  resetName(event) {
    this.setState({
      name: this.state.savedName
    })
  }

  onContent(event) {
    this.setState({
      content: event.target.value
    })
  }

  onSubmit(event) {
    if (event.key === 'Enter'){
      this.props.submit(this.state)
      this.setState({
        content: '',
      })
    }
  }


  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onChange={ this.onNameContent } onKeyPress={ this.onSubmitName } onBlur={ this.resetName } value={ this.state.name } />
        <input className="chatbar-message" onChange={ this.onContent } onKeyPress={ this.onSubmit } value={ this.state.content} placeholder="Type a message and hit ENTER" />
      </footer>
      )
  }
}

export default Chatbar



