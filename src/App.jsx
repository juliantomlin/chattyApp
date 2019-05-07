import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx'
import Messages from './Message.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
                  currentUser: {name: "Bob"},
                  messages: [
                    {
                      username: "Bob",
                      content: "Has anyone seen my marbles?",
                      id: 1,
                    },
                    {
                      username: "Anonymous",
                      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
                      id: 2,
                    }
                  ]
                }

  this.onReturn = this.onReturn.bind(this)
  }



 onReturn(event) {
    this.setState({messages: this.state.messages.concat({username: this.state.currentUser.name, content: event, id: this.state.messages[this.state.messages.length - 1].id + 1})})
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");

      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)

      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <Messages messages={this.state.messages}/>
        <Chatbar username={this.state.currentUser.name} submit={this.onReturn}/>
      </div>
    );
  }
}
export default App;