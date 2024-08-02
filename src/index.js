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
		let gameWorld = new World(500)
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

app.use('/view', express.static(path.join(__dirname, 'viewer')))

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

app.get("/startMatch", (req, res) => {
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

	let player = new Player()
	player.uuid = utils.generateUUID()
	player.name = req.body.name.toString()

	player.controlCode = utils.generateCC()
	
	let match = utils.findByUUID(games.matches, requestedUuid)
	if(match){
		match.join(player)
		res.status(200).send(
			{
				matchUUID: match.uuid,
				playerUUID: player.uuid,
				controlCode: player.controlCode
			}
		)
	} else{
		res.status(404).send({ error: 'Game not found' });
	}
})

app.post("/move/:uuid", (req, res) => {
	let requestedUuid = req.params.uuid;

	let movement = {
		controlCode: req.body.controlCode ?? "",
		angle: req.body.angle ?? 0,
		moving: req.body.moving ?? false,
		shooting: req.body.shooting ?? false,
	}

	let match = utils.findByUUID(games.matches, requestedUuid)
	if(match){
		let player = utils.findByCC(match.players, movement.controlCode)
		if(player){
			match.move(player, movement)
			res.status(200).send({ status: "success" })
			return
		}
		res.status(404).send({ error: "Player not found" })
		return
	}
	res.status(404).send({ error: "Game not found" });
	return
})


app.listen(port, () => {
    console.log(`Server started\nPort ${port}`);
});