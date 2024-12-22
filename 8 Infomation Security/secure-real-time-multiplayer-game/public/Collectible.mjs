class Collectible {
  constructor({ x, y, value, id }) {
    this.x = x;       // X position of the collectible on the canvas
    this.y = y;       // Y position of the collectible on the canvas
    this.value = value; // The value that the collectible adds to the player's score
    this.id = id;     // Unique identifier for the collectible
  }
}

export default Collectible;
