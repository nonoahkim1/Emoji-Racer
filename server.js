import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
const app = express();
const server = createServer(app);
const io = new Server(server);
import url from 'url';
import path from 'path';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));
server.listen(3000);

// server code goes here!
// first listen for connection using io.on
// then... within callback, use socket.on, socket.emit, socket.broadcast, etc.
let emojiPositions = { player1: 0, player2: 0 }; // Store emoji positions

io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);

    // Send initial positions to newly connected client
    socket.emit('positions', emojiPositions);

    socket.on('move', (player) => {
        // Update positions and broadcast
        if (player === 'player1') {
            emojiPositions.player1 += 10; // Adjust the increment value as needed
        } else if (player === 'player2') {
            emojiPositions.player2 += 10;
        }
        io.emit('positions', emojiPositions);
    });

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    });
});

// NOTE THAT WE ARE LISTENING WITH server, NOT app!
server.listen(3000);