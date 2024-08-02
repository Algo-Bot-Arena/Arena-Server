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
	res.send(games.matches.map(function(item){
		return item.uuid
	}))
})

app.get("/game/:uuid", (req, res) => {
	let requestedUuid = req.params.uuid;
	let game = utils.findByUUID(games.matches, requestedUuid)
  
	if (game) {
	  res.send(game);
	} else {
	  res.status(404).send({ error: 'Game not found' });
	}
});

app.post("/startMatch", (req, res) => {
	try {
		let startedGame = games.startMatch()
		// res.sendStatus(200)
		res.send({"uuid": startedGame.uuid})
	} catch (error) {
		res.status(500).send({ error: 'Game failed to start' })
	}
})

app.post("/join/:uuid", (req, res) => {
	let requestedUuid = req.params.uuid;

	let player = new Player(req.name)
	player.uuid = utils.generateUUID()
	
	let match = utils.findByUUID(games.matches, requestedUuid)
	if(match){
		match.join(player)
		res.status(200).send(utils.findByUUID(match.players, player.uuid))
	} else{
		res.status(404).send({ error: 'Game not found' });
	}
})

app.listen(port, () => {
    console.log(`Server started\nPort ${port}`);
});