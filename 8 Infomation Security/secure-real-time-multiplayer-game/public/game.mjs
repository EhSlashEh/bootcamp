import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');

const player = new Player({ x: 50, y: 50, id: 'player1' }); // Example player
const collectibles = [
  new Collectible({ x: 100, y: 150, value: 10, id: 'collectible_1' }),
  new Collectible({ x: 300, y: 200, value: 15, id: 'collectible_2' })
]; // Example collectibles

function drawPlayer(player) {
  context.fillStyle = 'blue'; // Player color
  context.fillRect(player.x, player.y, 20, 20); // Draw player as a square
}

function drawCollectible(collectible) {
  context.fillStyle = 'green'; // Collectible color
  context.beginPath();
  context.arc(collectible.x, collectible.y, 10, 0, 2 * Math.PI); // Draw collectible as a circle
  context.fill();
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
}

function updateGameState() {
  collectibles.forEach((collectible, index) => {
    if (player.collectItem(collectible)) {
      // If player collects the item, remove it from the array
      collectibles.splice(index, 1);
      socket.emit('itemCollected', collectible.id); // Notify the server about the collected item
    }
  });
}

function gameLoop() {
  clearCanvas();
  drawPlayer(player);
  collectibles.forEach(drawCollectible);
  updateGameState();
  requestAnimationFrame(gameLoop); // Repeat the game loop
}

// Handle player movement using keyboard
document.addEventListener('keydown', (e) => {
  const speed = 5;
  player.movePlayer(e.key, speed);
});

// Start the game loop
gameLoop();

// Listen for updates from the server
socket.on('gameStateUpdate', (data) => {
  // Handle game state updates from the server, e.g., other players' positions
});

socket.on('playerJoined', (newPlayer) => {
  // Handle a new player joining the game
});

socket.on('itemCollected', (collectedItemId) => {
  // Handle the removal of a collected item from the game state
  const index = collectibles.findIndex(item => item.id === collectedItemId);
  if (index !== -1) {
    collectibles.splice(index, 1);
  }
});
