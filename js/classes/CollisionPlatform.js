class CollisionPlatform {
	constructor({position}) {
		this.position = position
		this.width = 16;
		this.heigh = 16;
	}

	draw() {
		c.fillStyle = 'rgba(255, 0, 0, 0.2)'
		c.fillRect(this.position.x, this.position.y, this.width, this.heigh)
	}

	update() {
		this.draw()
	}
}