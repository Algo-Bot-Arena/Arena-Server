class Player{
	constructor(){
		this.x = 0
		this.y = 0
		this.vx = 0
		this.vy = 0
		this.name = "unknown"
		this.uuid = 0

		this.alive = false

		this.controlCode = 0

		this.radius = 10

		this.angle = 0
	}
}

module.exports = Player