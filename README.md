# Arena Server

## API SPEC

### GET /view
Serves game viewer client

### GET /games
Returns every running game's UUID

### GET /game/{GAME UUID}
Returns info about a currently running game

### GET /startMatch
Starts a new match and returns the UUID

### POST /join/{GAME UUID}
Returns the player UUID, match UUID and control code
#### Params
name: string: name of the bot

### POST /move/{GAME UUID}
Moves a bot in a game, Returns 
#### Params
controlCode: string: code returned on bot join

moving: bool: whether or not to move the bot

angle: num: 0-360 to point the bot in

shooting: bool: whether or not the bot is shooting