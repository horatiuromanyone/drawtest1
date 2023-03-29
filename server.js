const WebSocket = require('ws');
const express = require('express');

// start an express server on port 80
/*const app = express();
app.use(express.static('public'));
app.listen(80, () => {
  console.log('Express server started on port 80');
});*/


const PORT = (process.env.PORT || 8080);

// Create WebSocket server
const server = new WebSocket.Server({ port: PORT });

// Handle incoming connections
server.on('connection', (socket) => {
  console.log('Client connected');

  // Send current canvas state to new client
  const imageData = canvas.toDataURL();
  const canvasStateMessage = {
    type: 'canvasState',
    imageData: imageData
  };
  socket.send(JSON.stringify(canvasStateMessage));

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