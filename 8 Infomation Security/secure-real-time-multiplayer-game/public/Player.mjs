class Player {
  constructor({ x, y, score = 0, id }) {
    this.x = x;      // Player's X position on the canvas
    this.y = y;      // Player's Y position on the canvas
    this.score = score; // Player's score, default is 0
    this.id = id;    // Unique identifier for the player
  }

  // Method to move the player based on the direction and speed
  movePlayer(dir, speed) {
    switch (dir) {
      case 'ArrowUp':
        this.y -= speed;
        break;
      case 'ArrowDown':
        this.y += speed;
        break;
      case 'ArrowLeft':
        this.x -= speed;
        break;
      case 'ArrowRight':
        this.x += speed;
        break;
      default:
        break;
    }
  }

  // Method to check if the player collides with a given collectible
  collision(collectible) {
    const distance = Math.sqrt(
      Math.pow(this.x - collectible.x, 2) + Math.pow(this.y - collectible.y, 2)
    );
    // Check if the distance between player and collectible is small enough to be considered a collision
    return distance < 20; // Adjust the threshold based on your game scale
  }

  // Method to update the player's score upon collecting an item
  collectItem(collectible) {
    if (this.collision(collectible)) {
      this.score += collectible.value;
      return true; // Indicate that the item has been collected
    }
    return false; // No collision, item not collected
  }

  // Method to calculate and update the player's rank based on scores
  calculateRank(players) {
    // Sort players by score in descending order
    players.sort((a, b) => b.score - a.score);
    return players.findIndex(player => player.id === this.id) + 1; // Return 1-based rank
  }
}

export default Player;
