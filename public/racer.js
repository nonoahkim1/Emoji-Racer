import { io } from '/socket.io/socket.io.esm.min.js';
const socket = io();

const player1Btn = document.querySelector('.player1Btn');
const player2Btn = document.querySelector('.player2Btn');
const player1Emoji = document.querySelector('.player1');
const player2Emoji = document.querySelector('.player2');

player1Btn.addEventListener('click', () => {
    socket.emit('move', 'player1');
});

player2Btn.addEventListener('click', () => {
    socket.emit('move', 'player2');
});

socket.on('positions', (positions) => {
    player1Emoji.style.left = `${positions.player1}px`;
    player2Emoji.style.left = `${positions.player2}px`;
});
