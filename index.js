const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

const scaledCanvas = {
	width: canvas.width/4,
	height: canvas.height/4
}

const floorCollisions2D = [];
for(let i = 0; i < floorCollisions.length; i += 36) {
	floorCollisions2D.push(floorCollisions.slice(i, i+36));
};
// console.log(floorCollisions2D);

const platformCollisions2D = [];
for(let i = 0; i < platformCollisions.length; i += 36) {
	platformCollisions2D.push(platformCollisions.slice(i, i+36));
};
// console.log(platformCollisions2D);


const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
	row.forEach((symbol, x) => {
		if(symbol === 192) {
			// console.log('draw a block');
			collisionBlocks.push(
				new CollisionBlock({position: {
					x: x * 16,
					y: y * 16,
				}})
			)
		}
	})
})

const collisionPlatforms = []
platformCollisions2D.forEach((row, y) => {
	row.forEach((symbol, x) => {
		if(symbol === 192) {
			collisionPlatforms.push(
				new CollisionPlatform({position: {
					x: x * 16,
					y: y * 16,
				}})
			)
		}
	})
})

// console.log(collisionBlocks);


const gravity = 0.5;


const player = new Player({
	position:{
		x: 100,
		y: 300
	},
	collisionBlocks,
	imageSrc: './img/warrior/Idle.png',
	frameRate: 8,
	animations: {
		Idle: {
			imageSrc: './img/warrior/Idle.png',
			frameRate: 8,
			frameBuffer: 3,
		},
		Run: {
			imageSrc: './img/warrior/Run.png',
			frameRate: 8,
			frameBuffer: 5,
		},
		Jump: {
			imageSrc: './img/warrior/Jump.png',
			frameRate: 2,
			frameBuffer: 3,
		},		
		Fall: {
			imageSrc: './img/warrior/Fall.png',
			frameRate: 2,
			frameBuffer: 3,
		},
	}
})


const keys = {
	d: {
		pressed: false,
	},
	a: {
		pressed: false,
	}
}

const background = new Sprite({
	position: {
		x: 0,
		y: 0,
	},
	imageSrc: './img/background.png'
})

function animate() {
	window.requestAnimationFrame(animate);

	c.fillStyle = 'white';
	c.fillRect(0, 0, canvas.width, canvas.height);

	c.save()
	c.scale(4, 4)
	c.translate(0, -background.image.height + scaledCanvas.height)
	background.update()

	collisionBlocks.forEach((collisionBlock) => {collisionBlock.update()})
	collisionPlatforms.forEach((collisionPlatform) => {collisionPlatform.update()})

	player.update();

	player.velocity.x = 0;
	if (keys.d.pressed) {
		player.switchSprite('Run')
		player.velocity.x = 2
	}
	else if(keys.a.pressed) player.velocity.x = -2
	else if(player.velocity.y === 0) {
		player.switchSprite('Idle')
	}

	if(player.velocity.y < 0) player.switchSprite('Jump')
	else if (player.velocity.y > 0) player.switchSprite('Fall')

	c.restore()
}


animate()

window.addEventListener('keydown', (event) => {
	switch(event.key) {
		case 'd':
			keys.d.pressed = true;
			break;
		case 'a':
			keys.a.pressed = true;
			break;
		case 'w':
			player.velocity.y = -8;
	} 
})

window.addEventListener('keyup', (event) => {
	switch(event.key) {
		case 'd':
			keys.d.pressed = false;
			break;
		case 'a':
			keys.a.pressed = false;
			break;
	} 
})