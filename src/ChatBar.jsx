import React, {Component} from 'react'

class Chatbar extends Component {
  constructor() {
    super()

    this.state = {
      content:''
    }

    this.onContent = this.onContent.bind(this)
    this.onSubmit = this.onSubmit.bind(this)



  }

  onContent(event) {
    this.setState({
      content: event.target.value
    })
  }

  onSubmit(event) {
      if (event.key === 'Enter'){
        this.props.submit(this.state.content)
        this.setState({
          content: ''
        })
      }
    }


  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.username} />
        <input className="chatbar-message" onChange={ this.onContent } onKeyPress={ this.onSubmit } value={ this.state.content} placeholder="Type a message and hit ENTER" />
      </footer>
      )
  }
}

export default Chatbar



