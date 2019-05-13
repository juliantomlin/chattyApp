import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx'
import Messages from './Message.jsx'
import Nav from './NavBar.jsx'
const uuidv1 = require('uuid/v1');


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
                  currentUser: {name: "Bob"},
                  userNumber: 0,
                  messages: [{username: "ADMIN",
                              content: "WELCOME",
                              id: 0}]
                }

  this.onReturn = this.onReturn.bind(this)
  this.onReturnName = this.onReturnName.bind(this)
  this.colorSelector = this.colorSelector.bind(this)
  }

  onReturn(msg) {
    const id = uuidv1()
    this.socket.send(JSON.stringify({type: 'message', username: this.state.currentUser.name, content: msg.content, color: this.state.currentUser.textColor, id: id}))     //sends raw message going out to the socket
  }

  onReturnName(name) {
    if (name != this.state.currentUser.name){
      const id = uuidv1()
      this.socket.send(JSON.stringify({type: 'notification', content: `${this.state.currentUser.name} has changed their name to ${name}.`, color: this.state.currentUser.textColor, id: id}))   //sends notification of name change
      this.setState({currentUser: {name: name, textColor: this.state.currentUser.textColor}})     // sets the users new name to the state
    }
  }

  colorSelector() {                     //picks a random color for the user to have assigned to them
    let ranNum = Math.random()
    let color = 'purple'
    if (ranNum < .25) {
      color = 'green'
    } else if (ranNum < .5){
      color = 'red'
    } else if (ranNum < .75){
      color = 'blue'
    }
    return color
  }


  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:8080");
    console.log("componentDidMount <App />");
    this.socket.onopen = function() {
      console.log('connection established')
    }

    let color = this.colorSelector()

    this.setState({currentUser: {name: "Anonymous", textColor: color}})

    const self = this;
    this.socket.onmessage = function(msg) {                                             //message comming in
      let incommingMsg = (JSON.parse(msg.data))
      self.setState({messages: self.state.messages.concat(incommingMsg)})
      if (incommingMsg.type === 'connection')                                           //updates number of connected users
        self.setState({userNumber: incommingMsg.users})
    }
  }

  render() {
    return (
      <div>
        <Nav userNumber={this.state.userNumber} />
        <Messages messages={this.state.messages} />
        <Chatbar username={this.state.currentUser.name} submit={this.onReturn} submitName={this.onReturnName} />
      </div>
    );
  }
}

export default App;