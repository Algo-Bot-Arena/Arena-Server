import { Player } from "./Player";
import * as utils from "./Utils";

export class Game {
    isRunning = false;
    width: number;
    height: number;
    uuid = utils.generateUUID();
    players = new Array<Player>;

    constructor(size = 500) {
        this.width = size;
        this.height = size;
    }

    start(): void {
        this.isRunning = true;
    }

    transformLocation(initialVector: Coordinates, angleInDegrees: number, distance: number): Coordinates {
        angleInDegrees = ((angleInDegrees % 360) + 360) % 360;

        const angleInRadians = angleInDegrees * (Math.PI / 180);

        const dx = distance * Math.cos(angleInRadians);
        const dy = distance * Math.sin(angleInRadians);

        const newX = initialVector.x + dx;
        const newY = initialVector.y + dy;

        return { x: newX, y: newY };
    }

    findSpawn(): Coordinates {
        // logic to make the player not spawn in a wall
        return {
            x: (this.width / 2) + 30,
            y: (this.width / 2) + 30
        };
    }

    addPlayer(player: Player): void {
        let spawnLoc = this.findSpawn();

        player.x = spawnLoc.x;
        player.y = spawnLoc.y;

        this.players.push(player);
    }

    findPlayerByCC(controlCode: string): Player | undefined {
        return this.players.find((player) => player.controlCode === controlCode);
    }

    playerMove(player: Player, movement: Movement): Player {
        player.angle = movement.angle;

        let position = { x: player.x, y: player.y };

        if (movement.isMoving) {
            position = this.transformLocation(player, player.angle, 20); // add logic to use vx and vy
        }

        player.x = position.x;
        player.y = position.y;

        return player;
    }
}

interface Coordinates {
    x: number;
    y: number;
}

interface Movement {
    angle: number;
    isMoving: boolean;
    controlCode: string;
    isShooting: boolean;
}
