import { Game } from "./Game";
import { Player } from "./Player";

export class GameManager {
    games = new Array<Game>;

    startNewGame(): Game {
        console.log("Starting a new game");

        const game = new Game();
        game.start();

        this.games.push(game);

        return game;
    }

    findGameByUUID(uuid: string): Game | undefined {
        return this.games.find((game) => game.uuid === uuid);
    }
}