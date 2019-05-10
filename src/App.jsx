import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx'
import Messages from './Message.jsx'
import Nav from './NavBar.jsx'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
                  currentUser: {name: "Bob"},
                  userNumber: 0,
                  messages: [
                    {
                      type: 'message',
                      username: "Bob",
                      content: "Has anyone seen my marbles?",
                      id: 1,
                      color: 'red'
                    },
                    {
                      type: 'message',
                      username: "Anonymous",
                      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
                      id: 2,
                      color: 'purple'
                    }
                  ]
                }

  this.onReturn = this.onReturn.bind(this)
  this.onReturnName = this.onReturnName.bind(this)
  this.colorSelector = this.colorSelector.bind(this)
  }

  onReturn(msg) {
    // this.setState({messages: this.state.messages.concat({username: this.state.currentUser.name, content: msg, id: this.state.messages[this.state.messages.length - 1].id + 1})})
    this.socket.send(JSON.stringify({type: 'message', username: this.state.currentUser.name, content: msg.content, color: this.state.currentUser.textColor}))
  }

  onReturnName(name) {
    if (name != this.state.currentUser.name){
      this.socket.send(JSON.stringify({type: 'notification', content: `${this.state.currentUser.name} has changed their name to ${name}.`, color: this.state.currentUser.textColor}))
      this.setState({currentUser: {name: name, textColor: this.state.currentUser.textColor}})
    }
  }

  colorSelector() {
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


// id: this.state.messages[this.state.messages.length - 1].id + 1

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:8080");
    console.log("componentDidMount <App />");
    this.socket.onopen = function() {
      console.log('connection established')
    }

    let color = this.colorSelector()

    this.setState({currentUser: {name: "Bob", textColor: color}})

    const self = this;
    this.socket.onmessage = function(msg) {
      let incommingMsg = (JSON.parse(msg.data))
      incommingMsg.id = self.state.messages[self.state.messages.length - 1].id + 1
      self.setState({messages: self.state.messages.concat(incommingMsg)})
      if (incommingMsg.type === 'connection')
        self.setState({userNumber: incommingMsg.users})
    }
    setTimeout(() => {
      console.log("Simulating incoming message");

      const newMessage = {id: this.state.messages[this.state.messages.length - 1].id + 1, username: "Michelle", content: "Hello there!", type: 'message'};
      const messages = this.state.messages.concat(newMessage)

      this.setState({messages: messages})
    }, 3000);
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