var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;
let canvas = document.getElementById("canvas")
let xDir = 1
let yDir = 0
let s = new snake(new particle(100, 0, 10, 10))
let foodLocation = pickFoodLocation()
let food

startAnimating(10);

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {

    // stop
    if (stop) {
        return;
    }

    // request another frame

    requestAnimationFrame(animate);

    // calc elapsed time since last loop

    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but...
        // Also, adjust for fpsInterval not being multiple of 16.67
        then = now - (elapsed % fpsInterval);

        // draw stuff here
        if (canvas.getContext) {
            const ctx = canvas.getContext("2d")

            window.addEventListener("keydown", (event) => {
                switch(event.code) {
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

            ctx.reset()
            s.draw(ctx, xDir, yDir)

            //generate a new food particle and scales by the size since we are returning a row and column rather than an actual location
            food = new particle(foodLocation.x * 10, foodLocation.y * 10, 10);
            s.setFoodTarget(food)
            ctx.fillStyle = "red"
            ctx.fillRect(food.x, food.y, 10, 10)

            if (s.hasEatenTheFood(food)) {
                s.grow(food)
                foodLocation = pickFoodLocation()
            }

            //ends the game if the snake dies
            if (s.shouldDie()) {
                var gameOverScreen = document.createElement("h1");
                gameOverScreen.innerHTML = "GAME OVER!!!"
                canvas.replaceWith(gameOverScreen)
            }
        }
    }
}

//picks a random location for the food
function pickFoodLocation() {
    //get the number of rows (w) and number of columns (h)
    let w = Math.floor(canvas.width / 10)
    let h = Math.floor(canvas.height / 10)

    //pick a random row and column
    let randomW = Math.floor(Math.random() * (w + 1))
    let randomH = Math.floor(Math.random() * (h + 1))

    //don't pick a location that is occupied by the snake
    while (s.tail.some(p => p.x == randomW * 10) && s.tail.some(p => p.y == randomH * 10)) {
        randomW = Math.floor(Math.random() * (w + 1))
        randomH = Math.floor(Math.random() * (h + 1))
    }

    return {x: randomW, y: randomH}
}