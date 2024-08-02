
class World{
	constructor(size = 500){
		this.running = false

		this.width = size
		this.height = size

		this.uuid = 0

		this.players = []
	}

	start(){
		this.running = true
	}

	findSpawn(){
		// logic to make the player not spawn in a wall
		return {
			x: this.width / 2,
			y: this.width / 2
		}
	}

	join(player){
		let spawnLoc = this.findSpawn()
		player.x = spawnLoc.x
		player.y = spawnLoc.y
		this.players.push(player)
	}
}

module.exports = World