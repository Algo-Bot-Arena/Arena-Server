const express = require("express");
const cors = require("cors")
const fs = require("fs");
const WebSocket = require('ws');
const path = require('path');


const utils = require("./utils.js")
const config = require("./config.json")
const port = config.port;

const app = express();

const World = require("./world.js")
const Player = require("./player.js")

let games = new class{
	constructor(){
		this.matches = []
	}

	startMatch(){
		let gameWorld = new World(100)
		gameWorld.id = this.matches.length + "_" + utils.generateUUID()
		gameWorld.start()

		this.matches.push(gameWorld)
	}
}


app.use(express.json());
app.use(
  cors()
);

app.get("/games", (req, res) => {
	
	res.send(games.matches)
})

app.listen(port, () => {
    console.log(`Server started\nPort ${port}`);
});