class particle {
    constructor(x, y, size, color) {
        this.x = x
        this.y = y
        this.size = size
        this.color = color
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size)
    }

    update(xDir, yDir) {
        this.x += xDir * this.size
        this.y += yDir * this.size
    }

    handleBoundaries(width, height) {
        if (this.x >= width) {
            this.x = 0;
        }

        if (this.x < 0) {
            this.x = width - this.size
        }

        if (this.y >= height) {
            this.y = 0
        }

        if (this.y < 0) {
            this.y = height - this.size
        }
    }
}