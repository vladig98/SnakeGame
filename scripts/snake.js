class snake {
    constructor(head) {
        this.tail = []
        this.head = head

        this.tail.push(head)

        // start the snake with a length of 10
        for (let i = 10; i >= 0; i--) {
            this.tail.push(new particle(i * SNAKE_SIZE, 0, SNAKE_SIZE, COLORS.snakeBody))
        }
    }

    draw(ctx, xDir, yDir) {
        const lastHeadX = this.head.x;
        const lastHeadY = this.head.y;

        this.head.update(xDir, yDir);
        this.head.handleBoundaries(ctx.canvas.width, ctx.canvas.height);
        this.head.draw(ctx);

        let prevX = lastHeadX;
        let prevY = lastHeadY;

        for (let i = 1; i < this.tail.length; i++) {
            const tempX = this.tail[i].x;
            const tempY = this.tail[i].y;

            this.tail[i].x = prevX;
            this.tail[i].y = prevY;

            prevX = tempX;
            prevY = tempY;

            this.tail[i].draw(ctx);
        }
    }

    hasEatenTheFood(food) {
        return this.areTouching(this.head, food)
    }

    grow() {
        const lastSegment = this.tail[this.tail.length - 1];
        this.tail.push(new particle(lastSegment.x, lastSegment.y, SNAKE_SIZE, COLORS.snakeBody));
    }

    shouldDie() {
        // the snake dies if the head touches the body
        if (this.tail.slice(1).some(part => this.areTouching(part, this.head))) {
            return true
        }

        return false
    }

    areTouching(particle1, particle2) {
        return particle1.x == particle2.x && particle1.y == particle2.y;
    }
}