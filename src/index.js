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
		console.log("Making a new match")
		let gameWorld = new World(100)
		gameWorld.uuid = this.matches.length + "_" + utils.generateUUID()
		gameWorld.start()

		this.matches.push(gameWorld)
		return gameWorld
	}
}


app.use(express.json());
app.use(
  cors()
);

app.get("/games", (req, res) => {
	res.send(games.matches)
})

app.get("/startMatch", (req, res) => {
	try {
		let startedGame = games.startMatch()
		// res.sendStatus(200)
		res.send({"uuid": startedGame.uuid})
	} catch (error) {
		res.sendStatus(500)
	}
})

app.listen(port, () => {
    console.log(`Server started\nPort ${port}`);
});