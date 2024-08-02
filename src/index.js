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
const Player = require("./player.js");
const { match } = require("assert");

let games = new class{
	constructor(){
		this.matches = []
	}

	startMatch(){
		console.log("Making a new match")
		let gameWorld = new World(100)
		gameWorld.uuid = utils.generateUUID()
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

app.post("/startMatch", (req, res) => {
	try {
		let startedGame = games.startMatch()
		// res.sendStatus(200)
		res.send({"uuid": startedGame.uuid})
	} catch (error) {
		res.sendStatus(500)
	}
})

app.post("/join", (req, res) => {
	let player = new Player(req.name)
	player.uuid = utils.generateUUID()
	
	let match = utils.findByUUID(games.matches, req.uuid)
	if(match){
		match.join(player)
		res.send(utils.findByUUID(match.players, player.uuid))
	}
})

app.listen(port, () => {
    console.log(`Server started\nPort ${port}`);
});