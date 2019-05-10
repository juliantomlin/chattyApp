import React, {Component} from 'react'



function checkForImg(data) {
  const imageStart = data.search(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)                                  // if the text contains an image url, append image tags to it
  if (imageStart > -1) {
    const stringStart = data.substring(0,imageStart)
    let combinedString = data.replace(stringStart, `${stringStart}</span><br><img class="image" src="`)
    const stringEnd = data.replace(/^.*(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/, '')
    if (stringEnd) {
      combinedString = combinedString.replace(stringEnd, `"/><span class='message-content'><br> ${stringEnd}`)
    } else {
      combinedString = combinedString + `"/><span class='message-content'>`
    }
    return {message: combinedString, didChange: true}
  }
  else {
    return {message: data, didChange: false}
  }
}


class UserMessage extends Component {                                                             // message constructor, checks if there is an image in the text and prints out the correct path
  render() {
  let messageWithImage = checkForImg(this.props.message.content)
  const {didChange, message} = messageWithImage
    return(
      <div className="message" key={this.props.message.id}>
        <span className={"message-username " + this.props.message.color}>{this.props.message.username}</span>
        {didChange && <span className="message-content" dangerouslySetInnerHTML={{__html: message}}></span>}
        {!didChange && <span className="message-content">{message}</span>}
      </div>
    )
  }
}

class Notification extends Component {
  render() {
    return(
      <div className={"message system " + this.props.message.color} key={this.props.message.id}>
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
            )
        })
      }

      </main>
    )
  }
}

export default Messages


