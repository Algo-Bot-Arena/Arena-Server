import express from "express";
import cors from "cors";
import path from "path";

import { Player } from "./core/Player";
import { GameManager } from "./core/GameManager";

const app = express();
const gameManager = new GameManager();

app.use(express.json());
app.use(cors());

app.use("/view", express.static(path.join(__dirname, "viewer")));

app.get("/games", (req, res) => {
    res.send(gameManager.games.map(game => game.uuid));
});

app.get("/game:uuid", (req, res) => {
    const requestedUUID = req.params.uuid;
    const game = gameManager.findGameByUUID(requestedUUID);

    if (game) {
        res.send(game);
    } else {
        res.status(404).send({ error: "Game not found" });
    }
});

app.get("/startGame", (req, res) => {
    try {
        const newGame = gameManager.startNewGame();
        res.send({ uuid: newGame.uuid });
    } catch (error) {
        res.status(500).send({ error: "Game failed to start" });
    }
});

app.post("/joinGame/:uuid", (req, res) => {
    const requestedUUID = req.params.uuid;

    const player = new Player();
    player.name = req.body.name.toString();

    const game = gameManager.findGameByUUID(requestedUUID);

    if (game) {
        game.addPlayer(player);

        res.status(200).send(
            {
                matchUUID: game.uuid,
                playerUUID: player.uuid,
                controlCode: player.controlCode
            }
        );
    } else {
        res.status(404).send({ error: "Game not found" });
    }
});

app.post("/move/:uuid", (req, res) => {
    const requestedUUID = req.params.uuid;

    const movement = {
        controlCode: req.body.controlCode ?? "",
        angle: req.body.angle ?? 0,
        isMoving: req.body.moving ?? false,
        isShooting: req.body.shooting ?? false,
    };

    const game = gameManager.findGameByUUID(requestedUUID);

    if (game) {
        const player = game.findPlayerByCC(movement.controlCode);

        if (player) {
            game.playerMove(player, movement);
            res.status(200).send({ status: "success" });
            return;
        }

        res.status(404).send({ error: "Player not found" });
        return;
    }

    res.status(404).send({ error: "Game not found" });
    return;
});

app.listen(config.port, () => {
    console.log(`Server started\nPort ${config.port}`);
});
