import * as utils from "./Utils";

export class Player {
    x = 0;
    y = 0;
    vx = 0;
    vy = 0;
    name = "unknown";
    uuid = utils.generateUUID();
    controlCode = utils.generateCC();
    isAlive = false;
    radius = 10;
    angle = 0;
}
