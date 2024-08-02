const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const host = window.location.origin
let currentGame = false

function getInput(){
	return document.getElementById("inputBar").value
}

function processGame(game){
	canvas.height = game.height
	canvas.width = game.width

	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if(game.running){
		canvas.style.borderColor = "green"
	} else {
		canvas.style.borderColor = "red"
	}

	// Draw players
	if (game.players && Array.isArray(game.players)) {
		game.players.forEach(player => {
			// Drawing a circle with player's x, y as center and radius
			const radius = player.radius ?? 10; // Use player.radius, default to 10 if not present
			ctx.fillStyle = 'blue'; // Set the color you want for the players
			ctx.beginPath();
			ctx.arc(player.x, player.y, radius, 0, Math.PI * 2);
			ctx.fill();
		});
	}
}

async function getGame(uuid){

    try {
        const response = await fetch("http://localhost:8004/game/" + uuid);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Assuming the server responds with JSON
        console.log(data); // Log the response data for now
		return data
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
		return false
    }
}

let pollCurrentGame = false

function connectGame(){
	let inputData = getInput()

	currentGame = inputData

	if(pollCurrentGame){
		clearInterval(pollCurrentGame)
	}
	pollCurrentGame = setInterval(async function(){
		processGame(await getGame(currentGame))
	}, 1000)
}
