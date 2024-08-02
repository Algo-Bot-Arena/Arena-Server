
class World{
	constructor(size = 500){
		this.running = false

		this.width = size
		this.height = size

		this.uuid = 0

		this.players = []
	}

	transformLocation(initialVector, angleInDegrees, distance) {
		// Normalize the angle to the range [0, 360)
		angleInDegrees = ((angleInDegrees % 360) + 360) % 360;
	
		// Convert the angle from degrees to radians
		var angleInRadians = angleInDegrees * (Math.PI / 180);
		
		// Calculate the x and y components of the vector
		var dx = distance * Math.cos(angleInRadians);
		var dy = distance * Math.sin(angleInRadians);
		
		// Add the components to the initial position
		var newX = initialVector.x + dx;
		var newY = initialVector.y + dy;
		
		// Return the new vector as an object
		return { x: newX, y: newY };
	}
	
	

	start(){
		this.running = true
	}

	findSpawn(){
		// logic to make the player not spawn in a wall
		return {
			x: (this.width / 2) + 30,
			y: (this.width / 2) + 30
		}
	}

	join(player){
		let spawnLoc = this.findSpawn()
		player.x = spawnLoc.x
		player.y = spawnLoc.y
		this.players.push(player)
	}

	move(player, movement){
		player.angle = movement.angle

		let pos = {x: player.x, y: player.y}

		if(movement.moving){
			pos = this.transformLocation(player, player.angle, 20) // add logic to use vx and vy
		}

		player.x = pos.x
		player.y = pos.y
		return player
	}
}

module.exports = World