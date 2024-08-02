const express = require("express");
const cors = require("cors")
const fs = require("fs");
const WebSocket = require('ws');
const path = require('path');


const config = require("./config.json")
const port = config.port;

const app = express();

const World = require("./world.js") 

let gameWorld = new World(100).create()

app.use(express.json());
app.use(
  cors()
);

app.get("/", (req, res) => {
	res.send("wsp bb")
})

app.listen(port, () => {
    console.log(`Server started\nPort ${port}`);
});