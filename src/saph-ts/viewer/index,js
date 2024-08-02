const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const host = window.location.origin
let currentGame = false

window.pollingRate = 500

function getInput(){
	return document.getElementById("inputBar").value
}

function processGame(game) {
    canvas.height = game.height;
    canvas.width = game.width;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Transform the coordinate system for all drawings
    ctx.save();
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);

    if (game.running) {
        canvas.style.borderColor = "green";
    } else {
        canvas.style.borderColor = "red";
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
            ctx.closePath();

			// Draw angle line
            if (player.angle !== undefined) {
                const lineLength = radius * 2; // Length of the angle line
                const endX = player.x + lineLength * Math.cos(player.angle);
                const endY = player.y + lineLength * Math.sin(player.angle);
                ctx.strokeStyle = 'black'; // Color for the angle line
                ctx.beginPath();
                ctx.moveTo(player.x, player.y);
                ctx.lineTo(endX, endY);
                ctx.stroke();
                ctx.closePath();
            }

            // Save the current state before drawing the text
            ctx.save();
            
            // Invert the text drawing transformation
            ctx.scale(1, -1); // Flip vertically
            ctx.translate(0, -canvas.height); // Move the origin back to the top-left

            // Draw nametag above the player
            ctx.fillStyle = 'black'; // Color for the nametag text
            ctx.font = '12px Arial'; // Font for the nametag text
            ctx.textAlign = 'center'; // Center align the text horizontally
            // Since we've inverted and translated the context, the y-coordinate needs to 
            // be calculated to match the normal right-side-up drawing
            ctx.fillText(player.name ?? 'Player', player.x, canvas.height - (player.y + radius + 10));

            // Restore the state after drawing the text
            ctx.restore();

            
        });
    }

    // Restore the original transformation
    ctx.restore();
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
	}, window.pollingRate)
}
