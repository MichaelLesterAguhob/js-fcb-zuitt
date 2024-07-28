
// reusable variable with value
let board;
let score = 0;
let rows = 4;
let columns = 4;

//var use to assure that the player will be congratulated only one time after reaching 2048

let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;


// for swiping
let startX = 0;
let startY = 0;

// reusable task
function setGame(){

	board = [
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]
		];// Goal, will use this backend board to create our front end board
	// board = [
    //     [32, 8, 4, 0],
    //     [4, 128, 64, 256],
    //     [8, 32, 16, 2],
    //     [16, 2, 256, 1024]
    // ];

	// loop are code to repeat the tasks inside it, until it fullfill
	for(let r=0; r < rows; r++){
		for(let c=0; c < columns; c++){
			// create and design a tile

			let tile = document.createElement("div");

			//each tile will have invisible id
			tile.id = r.toString() + "-" + c.toString();

			let num = board[r][c];

			updateTile(tile, num);

			document.getElementById("board").append(tile)
		}
	}
	setTwo()
	setTwo()
}

//update the appearance of the tile that should have tile number and bg color
function updateTile(tile, num){

	tile.innerText = "";
	tile.classList.value = "";

	tile.classList.add("tile");

	if(num > 0){
		tile.innerText = num.toString();
	
		if(num <= 4096){
			tile.classList.add("x" + num.toString());
		}

		else{
			tile.classList.add("x8192");
		}
	}
}

window.onload = function(){
	setGame();
}


function handleSlide(event){
	//event.code represents the pressed key
	console.log(event.code);

	if(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.code))
	{
		event.preventDefault(); // preventig arrow keys to slide the whole page

		if(event.code == "ArrowLeft"){
			slideLeft();
			setTwo();
		}
		else if(event.code == "ArrowRight"){
			slideRight();
			setTwo();
		}
		else if(event.code == "ArrowUp"){
			slideUp();
			setTwo();
		}
		else if(event.code == "ArrowDown"){
			slideDown();	
			setTwo();
		}
	}
	checkWin();

// if there is an empty tile, the player has not yet lose the game
	if(hasLost() == true)
	{
		alert("Game Over! You have lost the game. Game will restart");
		restartGame();
		alert("Click any arrow key to restart");
	}

	document.getElementById('score').innerText = score;
}

document.addEventListener("keydown", handleSlide);


// function slideLeft(){
	
// 	for(let r = 0; r < rows; r++){
// 		let row = board[r];

// 		let originalRow = row.slice();
// 		row = slide(row);
// 		board[r] = row;
// 		for(let c = 0; c < columns; c++){

// 			//this code retrieve tile element
// 			let tile = document.getElementById(r.toString() + "-" + c.toString());

// 			let num = board[r][c];

// 			if(originalRow[c] !== num && num!==0){
// 				tile.style.animation = "slide-from-right"
// 				setTimeout(()=> {
// 					tile.style.animation = "";
// 				}, 300);
// 			}
// 			//update the appearance of the tile
// 			updateTile(tile, num);


// 		}
// 	}
// }
function slideLeft(){

	for(let r=0; r<rows; r++){

		let row = board[r];

		
		let originalRow = row.slice(); //added
		
		row = slide(row); // slideLeft() function uses slide() function to merge tiles with the same values.
		board[r] = row;
		


		for(let c = 0; c<columns; c++){

			// this code is the retrieve our tile element
			let tile = document.getElementById(r.toString() + "-" + c.toString());

			let num = board[r][c];

			if(originalRow[c] !== num && num!==0){
				
				tile.style.animation = "slide-from-right 0.3s";
				setTimeout(()=> {
					tile.style.animation = "";
				}, 300);
			}
			// Updates the appearance of the tile
			updateTile(tile, num);
		}
	}
}


function slideRight(){
	
	for(let r = 0; r < rows; r++){
		
		let row = board[r];
		//0022
		//4000

		//2 2 0 0
		//0 0 2 2

		//4 0 0 0 - slide left
		//0 0 0 4 - reversed
		let originalRow = row.slice(); //added
		row.reverse();
		row = slide(row);
		row.reverse();

		board[r] = row;

		for(let c = 0; c < columns; c++){

			//this code retrieve tile element
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			
			let num = board[r][c];
			if(originalRow[c] !== num && num!==0){
				
				tile.style.animation = "slide-from-left 0.3s";
				setTimeout(()=> {
					tile.style.animation = "";
				}, 300);
			}
			//update the appearance of the tile
			updateTile(tile, num);
		}
	}
}


// function slideUp(){
// 	for(let c = 0; c < rows; c++){

// 		let col = [ board[0][c], board[1][c], board[2][c], board[3][c] ];

// 		// let col = [ [board[0][c], board[1][c], board[2][c], board[3][c] ];
// 		col = slide(col); // slide up to merge tiles with same value

// 		// rows per column in our program, represent only one tile
// 		for(let r = 0; r < rows; r++){

// 			board[r][c] = col[r];

// 			//this code retrieve tile element
// 			let tile = document.getElementById(r.toString() + "-" + c.toString());

// 			let num = board[r][c];

// 			let changeIndices = [];
// 		for(let r=0; r<rows; r++){
// 			if(originalRow[r] !== row[r]){
// 				changeIndices.push(r);
// 			}
// 		}
// 		if(changeIndices.includes(r) && num!==0){
// 				tile.style.animation = "slide-from-bottom 0.3s";
// 				setTimeout(()=>{
// 					tile.style.animation = "";
// 				}, 300)
// 			}
// 			//update the appearance of the tile
// 			updateTile(tile, num);
// 		}
// 	}
// }

// function slideDown(){
	
// 	for(let c = 0; c < rows; c++){

// 		let col = [ board[0][c], board[1][c], board[2][c], board[3][c] ];

// 		col.reverse();
// 		col = slide(col); // slide down to merge tiles with same value
// 		col.reverse();

// 		// rows per column in our program, represent only one tile
// 		for(let r = 0; r < rows; r++){

// 			board[r][c] = col[r];

// 			//this code retrieve tile element
// 			let tile = document.getElementById(r.toString() + "-" + c.toString());

// 			let num = board[r][c];

// 			//update the appearance of the tile
// 			updateTile(tile, num);
// 		}
// 	}
// }


//filterzero removes zeroes

function slideUp(){

	for(let c=0; c<columns; c++){

		let col = [ board[0][c], board[1][c], board[2][c], board[3][c] ];

		let originalCol = col.slice();
		col = slide(col); // slideUp() function uses slide() function to merge tiles with the same values.

		let changeIndices = [];
		for(let r=0; r<rows; r++){
			if(originalCol[r] !== col[r]){
				changeIndices.push(r);
			}
		}
		
		for(let r = 0; r<rows; r++){

			board[r][c] = col[r];

			// this code is the retrieve our tile element
			let tile = document.getElementById(r.toString() + "-" + c.toString());

			let num = board[r][c];

			if(changeIndices.includes(r) && num!==0){
				tile.style.animation = "slide-from-bottom 0.3s";
				setTimeout(()=>{
					tile.style.animation = "";
				}, 300)
			}

			// Updates the appearance of the tile
			updateTile(tile, num);
		}
	}
}

function slideDown(){

	for(let c=0; c<columns; c++){
		let col = [ board[0][c], board[1][c], board[2][c], board[3][c] ];

		let originalCol = col.slice();
		col.reverse();
		col = slide(col);
		col.reverse(); // slideDown() function uses slide() function to merge tiles with the same values.

		let changeIndices = [];
		for(let r=0; r<rows; r++){
			if(originalCol[r] !== col[r]){
				changeIndices.push(r);
			}
		}

		for(let r = 0; r<rows; r++){
			board[r][c] = col[r];
			// this code is the retrieve our tile element
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];
			// Animation Code:
			if(changeIndices.includes(r) && num!==0){
				tile.style.animation = "slide-from-top 0.3s";
				setTimeout(()=>{
					tile.style.animation = "";
				}, 300)
			}

			// Updates the appearance of the tile
			updateTile(tile, num);
		}
	}
}

function filterZero(row){
	return row.filter(num => num != 0);
}

//slide func merges the same adjacent tile
// core func for sliding and mergenig slide
function slide(row)
{
	// 0 2 2 0
	row = filterZero(row);
	for(let i = 0; i<row.length - 1; i++)
	{
		if(row[i] == row[i+1]){
			row[i] *= 2; // 4 2
			row[i+1] = 0; // 4 0
			score += row[i];
		}
	}
	// add zeroes back
	while(row.length < columns)
	{
		row.push(0);
	}
	return row;
}


//check empty tile(zero) in board
function hasEmptyTile(){

	//loop evaluate every tile
	for(let r=0; r<rows; r++){
		for(let c=0; c<columns; c++){
			
			if(board[r][c]==0){
				return true;
			}
		}
	}

	return false;
}

function setTwo(){

	//no need to generate new tile/ do nothing if false
	if(hasEmptyTile() == false){
		return; 
	}

	//codes below execute if condition above not met
	let found = false;

	while(!found){

		// thi swill generate a random row and column position to generate a random 2.
		let r = Math.floor(Math.random() * rows);
		let c = Math.floor(Math.random() * columns);

		//if the random tile is an empty tile, the program will make it a tile with number 2.
		if(board[r][c]==0){

			//the random vacant becomes 2
			board[r][c] = 2;


			let tile = document.getElementById(r.toString() + "-" + c.toString());
			tile.innerText = "2";
			tile.classList.add("x2");

			found = true;
		}
	}
}

function checkWin(){
	
	for(let r=0; r<rows; r++){
		for(let c=0; c<columns; c++){
			
			if(board[r][c] == 2048 && is2048Exist == false){
				alert("You win!");
				is2048Exist = true;
			}
			else if(board[r][c] == 4096 && is4096Exist == false){
				alert("You reached 4096!");
				is4096Exist = true;
			}
			else if(board[r][c] == 8192 && is8192Exist == false){
				alert("You reached 8192!");
				is8192Exist = true;
			}
		}
	}
}

function hasLost(){
	for(let r=0; r < rows; r++){
		for(let c=0; c < columns; c++){

			if(board[r][c]==0){
				return false;
			}

			const currentTile = board[r][c];

			if(
				// check if the current tile if it has a possible merge in its upper tile
				r > 0 && board[r-1][c] === currentTile ||
				// check if the current tile if it has a possible merge in its lower tile
				r < rows - 1 && board[r+1][c] === currentTile ||
				// check if the current tile if it has a possible merge in its left tile
				c > 0 && board[r][c-1] === currentTile ||
					// check if the current tile if it has a possible merge in its RIGHT tile
				c < columns - 1 && board[r][c+1] === currentTile
			){
				return false;
			}
		}
	}

	return true;
}

// RestartGame by replacing all values into zero.
function restartGame(){
    // Iterate in the board and 
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            board[r][c] = 0;    // change all values to 0
        }
    }
	score = 0;
    setTwo()    // new tile   
}

document.addEventListener('touchstart', (event)=>{
	startX = event.touches[0].clientX;
	startY = event.touches[0].clientY;
})

document.addEventListener('touchend', (event)=>
{
	if(!event.target.className.includes("tile"))
	{
		return;
		// do nothing. tile not touched
	}
	let diffX = startX - event.changedTouches[0].clientX;
	let diffY = startY - event.changedTouches[0].clientY;
	if(Math.abs(diffX) > Math.abs(diffY)) 
	{
		if(diffX > 0){
			slideLeft();
			setTwo();
		}
		else{
			slideRight();
			setTwo();
		}
	}
	else
	{
		if(diffY > 0){
			slideUp();
			setTwo();
		}
		else{
			slideDown();
			setTwo();
		}
	}

	document.getElementById('score').innerText = score;
	checkWin();
	if(hasLost() == true)
	{
		alert("Game Over! You have lost the game. Game will restart");
		restartGame();
		alert("Click any arrow key to restart");
	}
});

document.addEventListener('touchmove', (event)=>{
	if(!event.target.className.includes("tile"))
	{
		return;
	}
	event.preventDefault();
}, {passive: false});