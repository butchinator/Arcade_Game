// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = getRandomInt(80, 250);
    

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    player = player;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt)
    if (this.x > 505) {
        this.x = -50;
    }
    // if statement to handle player and enemy collisions
    if (player.x >= this.x - 30  && player.x <= this.x + 30
        && player.y >= this.y - 30 && player.y <= this.y + 30) {
            player.lives --;
            console.log(player.lives);
            player.x = 202;
            player.y = 405;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.lives = 3;
    this.score = 0;
    this.gameOver = false;
    this.noMoreMoves = false;
};

Player.prototype.update = function() {
    if (this.y < 0) {
        this.noMoreMoves = true;
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
            this.noMoreMoves = false;
        }, 400);
            
    }
};



Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keys) {

    if (this.noMoreMoves) return;
    switch(keys) {
        case 'up':
            this.y -= 85;
            break;
        case 'down':
            this.y += 85;
            break;
        case 'left':
            this.x -= 101;
            break;
        case 'right':
            this.x += 101;
    }
    if (this.x <= 0) this.x = 0;
    if (this.x > 400) this.x = 400;
    if (this.y >= 446) this.y = 445;
    if (this.y < 10) {
        this.score ++
        console.log(this.score);
    }
};


var player = new Player(202, 405);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(-50, 205),
    new Enemy(100, 120),
    new Enemy(300, 50)
];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
