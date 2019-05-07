import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx'
import Messages from './Message.jsx'

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <Messages />
        <Chatbar />
      </div>
    );
  }
}
export default App;
