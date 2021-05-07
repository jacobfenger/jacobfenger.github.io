let board = ["", "", "", "", "", "", "", "", ""]; // This stores the positions
let move_num = 1;

var winner_found = false; // If winner found is true, game is over and needs to be reset

const game_grid = document.querySelector(".game--grid");

const playMove = e => {
    
    var last_move = ""; // Store last move for winner overlay
    var cell = document.querySelector(`#cell_${e}`); // Get specific cell
    if (!cell.classList.contains("occupied") && !winner_found) { // if cell isn't occupied
        cell.classList.add("occupied"); 
        if (move_num % 2 == 0) { // Even move
            cell.querySelector(`.game--cross`).style.display = "block"; // Display a cross
            board[e] = "X";
            last_move = "X";
        } else {
            cell.querySelector(`.game--circle`).style.display = "block"; // Display a circle
            board[e] = "O";
            last_move = "O";
        }
        // If check winner returns true, the last move caused a win
        if (check_winner()) {
            // Winner has been found, display the overlay now
            document.querySelector(".game--overlay").style.display = "block";
            winner_found = true;
        }
        // Tie game if all moves have been made and no winner is found
        if (move_num == 9) {
            document.querySelector(".game--winner").innerHTML = "Tie Game!";
            document.querySelector(".game--overlay").style.display = "block";
        }

        move_num++;
    }
};

// Given a board, this will see if the most-recent move triggers a win
// Returns true if a winner is found, return false otherwise
const check_winner = () => {    
    // Check vertical/horizontal lines
    for (let i = 0; i < 9; i += 3) {
        if (check_line(i, i+1, i+2)) {
            return true;
        }
    }
    for (let i = 0; i < 3; i++) {
        if (check_line(i, i+3, i+6)) {
            return true;
        }
    }
    
    // Check both diagonals
    if (check_line(0, 4, 8) || check_line(2, 4, 6)) {
        return true;
    } 
    return false;
};

// Helper function to ease the winning checks for wins
const check_line = (a, b, c) => {
    return (
      board[a] == board[b] && board[b] == board[c] &&
      board[a] != ""
    );
};

function restart() {
    console.log("Restarting game...");
    
    // Iterate through each cell and reset everything
    for (let i = 0; i < 9; i++) {        
        var cell = document.querySelector(`#cell_${i}`);
        if (cell.classList.contains("occupied")) {
            cell.querySelector(`.game--cross`).style.display = "none";
            cell.querySelector(`.game--circle`).style.display = "none";
            cell.classList.remove("occupied"); 
            board[i] = "";
        }
    }
    document.querySelector(".game--overlay").style.display = "none";
    document.querySelector(".game--winner").innerHTML = "Winner!";
    winner_found = false;
    move_num = 1;
}
