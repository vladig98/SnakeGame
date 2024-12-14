var stop = false;
let canvas = document.getElementById("canvas")
let score = document.getElementById('score');
let xDir = 1
let yDir = 0
let s = new snake(new particle(10 * SNAKE_SIZE, 0, SNAKE_SIZE, COLORS.snakeHead))
let foodLocation = pickFoodLocation()
let food
let points = 0
let then, fpsInterval;

window.addEventListener("keydown", (event) => {
    switch (event.code) {
        case "ArrowDown":
            yDir = 1
            xDir = 0
            break
        case "ArrowUp":
            yDir = -1
            xDir = 0
            break
        case "ArrowLeft":
            xDir = -1
            yDir = 0
            break
        case "ArrowRight":
            xDir = 1
            yDir = 0
            break
        default:
            break
    }
});

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = null;
    stop = false;
    requestAnimationFrame(animate);
}

function animate(timestamp) {
    // stop
    if (stop) {
        return;
    }

    // request another frame
    requestAnimationFrame(animate);
    if (!then) {
        then = timestamp;
    }

    // calc elapsed time since last loop
    let elapsed = timestamp - then;

    // if enough time has elapsed, draw the next frame
    if (elapsed < fpsInterval) {
        return;
    }

    // Get ready for next frame by setting then=now, but...
    // Also, adjust for fpsInterval not being multiple of 16.67
    then = timestamp - (elapsed % fpsInterval);

    if (!canvas.getContext) {
        return;
    }

    PlayGame(canvas);
}

function PlayGame(canvas) {
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    s.draw(ctx, xDir, yDir)

    // draw the food
    food = new particle(foodLocation.x, foodLocation.y, SNAKE_SIZE, COLORS.food);
    food.draw(ctx)

    HasEatenFood(canvas)
    IsDead(canvas)
}

function HasEatenFood(canvas) {
    if (!s.hasEatenTheFood(food)) {
        return
    }

    //s.draw(ctx, xDir, yDir)
    s.grow()

    points += 10;
    score.innerHTML = "Points: " + points

    foodLocation = pickFoodLocation()

    if (foodLocation) {
        return
    }

    // End the game if the snake fills the whole screen - Winning scenario
    endGame("You win!")
}

function IsDead(canvas) {
    // End the game if the snake is dead
    if (!s.shouldDie()) {
        return;
    }

    endGame("GAME OVER!!!")
}

function endGame(message) {
    var gameOverScreen = document.createElement("h1");
    gameOverScreen.style.color = "white";
    gameOverScreen.innerHTML = message
    canvas.replaceWith(gameOverScreen)
    stop = true;
}

// picks a random location for the food
function pickFoodLocation() {
    const w = Math.floor(canvas.width / SNAKE_SIZE);
    const h = Math.floor(canvas.height / SNAKE_SIZE);

    if (s.tail.length >= w * h) {
        return null; // No space for new food
    }

    let randomW, randomH;
    do {
        randomW = Math.floor(Math.random() * w);
        randomH = Math.floor(Math.random() * h);
    } while (s.tail.some(p => p.x === randomW * SNAKE_SIZE && p.y === randomH * SNAKE_SIZE));

    return { x: randomW * SNAKE_SIZE, y: randomH * SNAKE_SIZE };
}

startAnimating(FPS);