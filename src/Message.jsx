import React, {Component} from 'react'

class UserMessage extends Component {
  render() {
    return(
      <div className="message" key={this.props.message.id}>
        <span className="message-username">{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>
    )
  }
}
//make notificaiton message
class Notification extends Component {
  render() {
    return(
      <div className="message system" key={this.props.message.id}>
        <span>{this.props.message.content}</span>
      </div>
    )
  }
}

class UserConnected extends Component {
  render () {
    return (
      <div className="message system" key={this.props.message.id}>
        <span>A user has {(this.props.message.direction === 'up') ? 'JOINED' : 'LEFT'} the chat</span>
      </div>
      )
  }
}

class Messages extends Component {
  render() {
    return (
      <main className="messages">
        {this.props.messages.map(message => {
          return (
            (message.type === 'notification') ? <Notification message={message}/> : ((message.type === 'message') ? <UserMessage message={message}/> : <UserConnected message={message}/> )
              //<div className="message" key={message.id}>
              //  <span className="message-username">{message.username}</span>
              //  <span className="message-content">{message.content}</span>
              //</div>
              //<div className="message system">
              //  Anonymous1 changed their name to nomnom.
              //</div>
            )
        })
      }

      </main>
    )
  }
}

export default Messages


