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



  }
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <Messages message={this.state.messages}/>
        <Chatbar username={this.state.currentUser.name}/>
      </div>
    );
  }
}
export default App;
