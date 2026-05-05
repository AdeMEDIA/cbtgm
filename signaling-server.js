const WebSocket = require('ws');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Create WebSocket server
const wss = new WebSocket.Server({ port: port + 1 });

console.log(`🚀 Signaling server starting on port ${port}`);
console.log(`📡 WebSocket server on port ${port + 1}`);

// Store active sessions
const sessions = new Map();

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      handleMessage(ws, message);
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
    // Clean up sessions when clients disconnect
    for (const [sessionId, session] of sessions.entries()) {
      if (session.host === ws) {
        session.host = null;
        console.log(`Host disconnected from session ${sessionId}`);
      }
      if (session.guest === ws) {
        session.guest = null;
        console.log(`Guest disconnected from session ${sessionId}`);
      }
      // Remove empty sessions
      if (!session.host && !session.guest) {
        sessions.delete(sessionId);
      }
    }
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

function handleMessage(ws, message) {
  console.log('Received message:', message.type);

  switch (message.type) {
    case 'register':
      handleRegister(ws, message);
      break;
    case 'offer':
      handleOffer(ws, message);
      break;
    case 'answer':
      handleAnswer(ws, message);
      break;
    case 'ice-candidate':
      handleIceCandidate(ws, message);
      break;
  }
}

function handleRegister(ws, message) {
  const { sessionId, isHost } = message;

  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, { host: null, guest: null });
  }

  const session = sessions.get(sessionId);

  if (isHost) {
    session.host = ws;
    console.log(`Host registered for session ${sessionId}`);
  } else {
    session.guest = ws;
    console.log(`Guest registered for session ${sessionId}`);

    // Notify host that guest joined
    if (session.host) {
      session.host.send(JSON.stringify({
        type: 'partner-joined',
        sessionId
      }));
    }
  }

  ws.sessionId = sessionId;
}

function handleOffer(ws, message) {
  const { sessionId, offer } = message;
  const session = sessions.get(sessionId);

  if (session && session.guest) {
    session.guest.send(JSON.stringify({
      type: 'offer',
      offer,
      sessionId
    }));
  }
}

function handleAnswer(ws, message) {
  const { sessionId, answer } = message;
  const session = sessions.get(sessionId);

  if (session && session.host) {
    session.host.send(JSON.stringify({
      type: 'answer',
      answer,
      sessionId
    }));
  }
}

function handleIceCandidate(ws, message) {
  const { sessionId, candidate } = message;
  const session = sessions.get(sessionId);

  // Send to the other peer
  const otherPeer = session.host === ws ? session.guest : session.host;
  if (otherPeer) {
    otherPeer.send(JSON.stringify({
      type: 'ice-candidate',
      candidate,
      sessionId
    }));
  }
}

// Start HTTP server
app.listen(port, () => {
  console.log(`🌐 HTTP server running on http://localhost:${port}`);
  console.log(`🎮 Open your CBT Quiz Game at: http://localhost:${port}`);
  console.log(`💡 For multiplayer to work, both players need to connect to the same signaling server`);
});