
class World{
	constructor(size = 100){
		this.running = false

		this.width = size
		this.height = size

		this.id = 0
	}

	start(){
		this.running = true
	}
}

module.exports = World