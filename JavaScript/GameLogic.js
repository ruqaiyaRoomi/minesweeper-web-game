
var board = [];
var flagged = false;
var mineLocation = [];
var tilesClicked = 0;
var gameOver = false;
var rows = 8;
var columns = 8;
var bombCount = 0;
var timeInterval;
var loggedIn = localStorage.getItem('loggedIn') === 'true';


// function to time how long the user takes to clear the board
function stopWatch() {
    "use strict";
    var seconds = 0;
    var minutes = 0;
    var displayTime = document.getElementById("displayTime");
   
    // setting the timeInterval 
    timeInterval = setInterval(() => {
        seconds++;
        if(seconds === 60){ // will add to the minutes if it reaches 60
            seconds = 0;
            minutes++;
            console.log(seconds);
        }
        // Update the displayTime element every second to show the formatted time as "Time: minutes:seconds",
        // adding a leading zero to the seconds if it's less than 10 for better formatting.
        displayTime.innerHTML = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
}

function saveScore() {
    if (!gameOver) return; // Exit if the game is not over
    clearInterval(timeInterval); //clears the timer


    // getting the username and state from the local storage
    const loggedIn = localStorage.getItem('loggedIn') === 'true'; 
    const username = localStorage.getItem('user_name');


    const timeDisplay = document.getElementById("displayTime").innerHTML;

    // splitting the time by ":" to sperate the minutes and seconds
    const timeParts = timeDisplay.split(":");
    const min = Number(timeParts[1]); 
    const sec = Number(timeParts[2]); 
    const totalSeconds = min * 60 + sec; // calculating the total time
   

    const level = document.getElementById("gameLevel").value;

    // the user can only win the game if the condition is met
    const gameWon = (tilesClicked === rows * columns - mineLocation.length);

    if(totalSeconds === 0){
        return;
    }
    // checks if the user if logged in 
    if (loggedIn) {
        let storedScores = localStorage.getItem('leaderboard');
        let scores = storedScores ? JSON.parse(storedScores) : [];
        

        // if the user is logged in and wins the game their score is saved and added to the leaderboard
        if (gameWon) {
            alert(`Game Over! Final Time: ${totalSeconds}. Your score has been saved.`);
            scores.push({username, time: totalSeconds, level });
            console.log(scores);
            scores.sort((a, b) => a.time - b.time);
            localStorage.setItem('leaderboard', JSON.stringify(scores));
        } else {
            // if they didnt clear the board the score isnt saved
            alert("Game Over! You did not clear the board. Your score will not be saved.");
        }
    } else {
        // if the user is a guest neither of them are saved
        alert("Game Over! Final Time: " + totalSeconds + ". Your score will not be saved as a guest.");
    }
}

function signout(){

    if (!loggedIn) {
        alert("You are already logged out.");
        return; 
    }

    resetBoard();  // resets the board and the level when signed out
    select_level();
    localStorage.setItem('loggedIn', 'false'); // updates the local storage
    alert("Signed Out Sucessfully");
}


function setMines(){ // function for randomly setting mines across the board
    mineLocation = [];
    let minesCount = bombCount; // sets mines based on the bomb count
    while(minesCount > 0){
        // randomly generates a row and column number in the gird
        let r = Math.floor(Math.random() * rows); //
        let c = Math.floor(Math.random() * columns);

        // creating the id 
        let id = r.toString() + "-" + c.toString();

        // adds the id to the mineLocation array if not already added
        if(!mineLocation.includes(id)){
            mineLocation.push(id);
            minesCount -=1;
        }
    }
}

function clearBoard(){
    clearInterval(timeInterval);
    resetBoard();
    select_level();
    document.getElementById("displayTime").innerHTML = "Time: 00:00";
}


function select_level(){
    // gets the level 
    const level = document.getElementById("gameLevel").value;
    // the bomb count is based on the level the user selects
    if(level === "Easy") {
        bombCount = 3;
    
    }else if(level === "Medium"){
        bombCount = 5;
        
    }

    else if(level === "Hard"){
    
        bombCount = 12;
    }

    resetBoard();
    clearInterval(timeInterval);
    createBoard();
    setMines();
    
}



function resetBoard(){
    // clears the stopwatch and resets all the other values
    clearInterval(stopWatch);
    board = [];
    mineLocation = [];
    gameOver = false;
    tilesClicked = 0;
    
    document.getElementById("gameBoard").innerHTML = "";
    document.getElementById("displayTime").innerHTML = "Time: 00:00";
    
}

function createBoard() {

    //creating the gird using nested for loops
    for(let r=0; r<rows; r++){
        let row = [];
        for( let c=0; c < columns; c++){
            // creating each div
            let gridBox = document.createElement("div");
            gridBox.id = r.toString() + "-" + c.toString(); // converting them into strings to create an id
            document.getElementById("gameBoard").append(gridBox);
            row.push(gridBox);

            // right click listener for placing flags
            gridBox.addEventListener("contextmenu", function (e) {
            e.preventDefault(); // preventing the default menu from appearing
            flagTile.call(this);
            
        });
        // left click listnener for reavling titles
        gridBox.addEventListener("click", function (e) {
            e.preventDefault(); 
            if(!gameOver){
                checkMines.call(this);
            }
        
        });

        }
        board.push(row);
        
    }

}

 // Checks if the title clicked is a mine
function checkMines() {
    let gridBox =  this;
   // if the id is in the mineLocations array then the game ends
    if(mineLocation.includes(gridBox.id)) {
        gameOver = true;
        revealMines(); // revaling the other mines
		alert("Game over! Final time: " + document.getElementById("displayTime").innerHTML);
        clearInterval(timeInterval)
        return;
    }
    
    if (!gameOver && tilesClicked === 0) {
        stopWatch(); // stopWatch if the game isnt over
    }

    if (gameOver == true) {
        return;
    }

    // checks if the neighbouring titles have mines 
    let findMines = gridBox.id.split('-');
    let r = parseInt(findMines[0]);
    let c = parseInt(findMines[1]);
    checkForMines(r,c);
    
}


function flagTile() {
    if (gameOver) return;
    // place a flag if the user thinks a tile is a mine
    let gridBox = this;
    if (gridBox.innerText === "") {
        gridBox.innerText = "🏴";
        flagged = true; 
    } else if (gridBox.innerText === "🏴") { // right click again to remove the flag
        gridBox.innerText = "";
        flagged = false; 
    }

    console.log("Tile flag status:", flagged);
}


function revealMines(){
    let gridBox =  this;
    mineLocation.forEach(index => {
        gridBox[index].innerText = "💣";
    });
    // if the user hits a mine itll reveal the other mines
}


function checkForMines(r, c) {
    // returns if the row or column is out of bounds
    if(r < 0 || r>=rows || c<0 || c >=columns){
        return;
    }
  
    if(board[r][c].classList.contains("tile-Click")){
        return;
    }

    // marking the current title as clicked 
    board[r][c].classList.add("tile-Click");
    tilesClicked +=1;


    let minesFound = 0;
    // Check all surrounding tiles for mines and count the number of adjacent mines.

    minesFound += checkTiles(r-1, c-1); //top left
    minesFound += checkTiles(r-1, c); // top
    minesFound += checkTiles(r-1, c+1); // top right


    minesFound += checkTiles(r, c-1); // left
    minesFound += checkTiles(r, c+1); // right


    minesFound += checkTiles(r+1, c-1); //bottom left
    minesFound += checkTiles(r+1, c); //bottom
    minesFound += checkTiles(r+1, c+1); // bottom right


     // If adjacent mines are found, display the count on the tile and style it accordingly.
    if(minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toLocaleString());
    }else {

        // If no adjacent mines, recursively check surrounding tiles to reveal empty spaces
        checkForMines(r-1, c-1);
        checkForMines(r-1, c);
        checkForMines(r-1, c+1);


        checkForMines(r, c-1);
        checkForMines(r, c+1);


        checkForMines(r+1, c-1);
        checkForMines(r+1, c);
        checkForMines(r+1, c+1);
    }
        // Check if all non-mine tiles have been clicked to determine if the player won.
    if(tilesClicked === rows * columns - mineLocation.length){
        alert("you won");
        alert("Game over! Final time: " + document.getElementById("displayTime").innerHTML);
        gameOver = true;
		saveScore();
        revealMines();
        clearInterval(timeInterval);
    }

}


function checkTiles(r, c){
      // If the row or column is out of bounds, return 0
    if(r < 0 || r>=rows || c<0 || c >=columns){
        return 0;
    }
    // Check if the current tile is in the mineLocation array.
    // If it contains a mine, return 1 (indicating a mine was found).
    if(mineLocation.includes( r.toString() + "-" + c.toString())){
        return 1;
    }

    // If no mine is found at this location, return 0.
    return 0;
}	

document.addEventListener('DOMContentLoaded', select_level);
document.getElementById("gameLevel").addEventListener("change", select_level);



function displayPopUp() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function closePopUp() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}
