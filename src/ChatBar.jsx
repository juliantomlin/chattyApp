import React, {Component} from 'react'

class Chatbar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.username} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
      )
  }
}

export default Chatbar



