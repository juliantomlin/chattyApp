ChattyApp
=====================

ChattyApp is a real time single page chatroom aplication utilizing a websocket server and react to create the realtime environment. The app features, in addition to real time communication across a network, the ability to change the user name, realtime update and display of the number of connected users, unique colors identification of each user, and share images by including a image URL in a message.

### Usage

Clone the repository and create your own git repo.

Install the dependencies and start the server and the socket server.

```
npm install
npm start
node Socket_server.js
open http://localhost:3000
```

### Dependencies

* "react": "15.4.2",
* "react-dom": "15.4.2",
* "ws": "7.0.0"

!["Chatroom"](https://github.com/juliantomlin/chattyApp/blob/master/docs/ChatRoomPicture.png)