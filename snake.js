class snake {
    constructor(head) {
        this.tail = []
        this.lastX = 0;
        this.lastY = 0;
        this.foodTarget
        this.head = head
        this.tail.push(head)
        for (let i = 10; i >= 0; i--) {
            this.tail.push(new particle(i * 10, 0, 10, 10))
        }
    }

    draw(ctx, xDir, yDir) {
        //draw the snake head
        ctx.fillRect(this.head.x, this.head.y, this.head.size, this.head.size)

        //set previous position to the current position of the snake's head
        this.lastX = this.head.x
        this.lastY = this.head.y

        //handle the snake's head movement
        this.head.update(xDir, yDir)
        this.head.handleBoundaries(ctx.canvas.width, ctx.canvas.height)

        //get the snake's head index
        let index = this.tail.indexOf(this.head)

        for (let i = 0; i < this.tail.length; i++) {
            //don't do anything if we have the snake's head
            if (i == index) {
                continue
            }

            //draw the snake's body
            let part = this.tail[i]
            ctx.fillRect(part.x, part.y, part.size, part.size)

            //handle snake's body movement
            this.moveToLastPosition(part)
            part.handleBoundaries(ctx.canvas.width, ctx.canvas.height)
        }
    }

    moveToLastPosition(part) {
        let tempX = part.x
        let tempY = part.y
        
        part.x = this.lastX
        part.y = this.lastY

        this.lastX = tempX
        this.lastY = tempY
    }

    hasEatenTheFood(food) {
        if (this.head.x == food.x && this.head.y == food.y) {
            return true
        }

        return false
    }

    grow(food) {
        this.tail.push(food)
    }

    shouldDie() {
        if (this.tail.some(part => part.x == this.head.x && part.y == this.head.y && part != this.head && part.x != this.foodTarget.x && part.y != this.foodTarget.y)) {
            return true
        }

        return false
    }

    setFoodTarget(food) {
        this.foodTarget = food;
    }
}