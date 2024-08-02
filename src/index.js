const express = require("express");
const cors = require("cors")
var fs = require("fs");
const WebSocket = require('ws');
const path = require('path');


const config = require("./config.json")
const port = config.port;

const app = express();

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