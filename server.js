const WebSocket = require('ws');
// canvas isn't working. we should include the package
//const canvas = require('canvas');

const PORT = (process.env.PORT || 8080);

// Create WebSocket server
const server = new WebSocket.Server({ port: PORT });

// Handle incoming connections
server.on('connection', (socket) => {
  console.log('Client connected');

  // Handle incoming messages
  socket.on('message', (message) => {
    console.log('Received message:', message);

    // Broadcast message to all connected clients
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle disconnections
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`WebSocket server started on port ${PORT}`);

// deployed to: https://draw-test-1.herokuapp.com/