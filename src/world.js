
class World{
	constructor(size = 100){
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
		return {
			x:0,
			y:0
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