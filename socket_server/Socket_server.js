const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 8080;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let users = 0

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    // if (client.readyState === ws.OPEN) {
      client.send(data)
    // }
  })
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  users ++
  wss.broadcast(`{"type": "connection", "users": "${users}", "direction": "up"}`)
  ws.on('message', (message => {
    wss.broadcast(message);
  }))

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    users --
    console.log('Client disconnected')
    wss.broadcast(`{"type": "connection", "users": "${users}", "direction": "down"}`)
  });
});

