class Sprite {
	constructor({position, imageSrc, frameRate = 1}) {
		this.position = position
		this.image = new Image()
		this.image.onload = () => {
			this.width = this.image.width / this.frameRate;
			this.height = this.image.height;
		}
		this.image.src = imageSrc
		this.frameRate = frameRate
		this.currentFrame = 0
	}

	draw() {
		if(!this.image) return
		const cropbox = {
			position: {
				x: this.currentFrame * (this.image.width / this.frameRate),
				y: 0,
			},
			width: this.image.width / this.frameRate,
			height: this.image.height,
		}
		c.drawImage(
			this.image,
			cropbox.position.x, 
			cropbox.position.y, 
			cropbox.width, 
			cropbox.height,
			this.position.x,
			this.position.y,
			this.width,
			this.height
		)
	}

	update() {
		this.draw()
		this.updateFrames()
	}

	updateFrames() {
		this.currentFrame++
		this.currentFrame %= this.frameRate;
	}
} 

