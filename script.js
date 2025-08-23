var players_move = "none";
var ai_move = "none";
var player_score = 0;
var ai_score = 0;
var game_end = false;
var logtextvalue = "Press match to start the game!";
var ai_game_length = 5;
var pwins = 0;
var aiwins = 0;

console.log("WHAT ARE YOU DOING HERE?");
console.log("Do not try to hack my game !!");
console.log("XD XD XD XD");

function selectMove(move) {
    players_move = move;
    updateScreen();
}

function updateScreen() {
    document.getElementById("matchtext").innerHTML = "First to " + ai_game_length + " points wins!";

    if (players_move === "none") {
        document.getElementById("playersbox").innerHTML = "_";
    } else if (players_move === "rock") {
        document.getElementById("playersbox").innerHTML = "✊";
    } else if (players_move === "paper") {
        document.getElementById("playersbox").innerHTML = "📄";
    } else if (players_move === "scissors") {
        document.getElementById("playersbox").innerHTML = "✂️";
    };

    if (ai_move === "none") {
        document.getElementById("enemybox").innerHTML = "?";
    } else if (ai_move === "rock") {
        document.getElementById("enemybox").innerHTML = "✊";
    } else if (ai_move === "paper") {
        document.getElementById("enemybox").innerHTML = "📄";
    } else if (ai_move === "scissors") {
        document.getElementById("enemybox").innerHTML = "✂️";
    }

    document.getElementById("logtext").innerHTML = logtextvalue;
    document.getElementById("pscore").innerHTML =  pwins + ":" + player_score;
    document.getElementById("escore").innerHTML = ai_score+ ":" + aiwins ;

    if (game_end) {
        document.getElementById("matchbutton").innerHTML = "New Game";
        document.getElementById("rock").disabled = true;
        document.getElementById("paper").disabled = true;
        document.getElementById("scissors").disabled = true;
    } else {
        document.getElementById("matchbutton").innerHTML = "Match";
        document.getElementById("rock").disabled = false;
        document.getElementById("paper").disabled = false;
        document.getElementById("scissors").disabled = false;
    }
}

function aiSelectMove() {
    var moves = ["rock", "paper", "scissors"];
    ai_move = moves[Math.floor(Math.random() * moves.length)];
}

function checkWinner() {
    if (players_move === ai_move) {
        logtextvalue = "It's a tie!";
    }
    if ((players_move === "rock" && ai_move === "scissors") ||
        (players_move === "paper" && ai_move === "rock") ||
        (players_move === "scissors" && ai_move === "paper")) {
        player_score++;
        logtextvalue = "You win this round!";
    } else if ((ai_move === "rock" && players_move === "scissors") ||
               (ai_move === "paper" && players_move === "rock") ||
               (ai_move === "scissors" && players_move === "paper")) {
        ai_score++;
        logtextvalue = "AI wins this round!";
    }
    if (player_score >= ai_game_length) {
        logtextvalue = "You win the game!";
        pwins++;
        patlat();
        game_end = true;
    } else if (ai_score >= ai_game_length) {
        logtextvalue = "AI wins the game!";
        aiwins++;
        game_end = true;
    }
}

function resetGame() {
    players_move = "none";
    ai_move = "none";
    player_score = 0;
    ai_score = 0;
    logtextvalue = "Press match to start the game!";
    game_end = false;
    updateScreen();
}

function match() {
    if (!game_end) {
        if (players_move === "none") {
            logtextvalue = "Please select your move first!";
            updateScreen();
        } else {
            aiSelectMove();
            checkWinner();
            updateScreen();
        }
    } else {
        resetGame();
    }
}

function gotoaigame() {
    window.location.href = "aigame.html";
    updateScreen();
}

function gotomenu() {
    window.location.href = "index.html";
}

function updateSlider() {
    document.getElementById("aimatchLengthValue").innerText = document.getElementById("airoundslider").value;
    localStorage.setItem("matchLength",parseInt(document.getElementById("airoundslider").value));
}

function getmatchlength() {
    ai_game_length = parseInt(localStorage.getItem("matchLength")) || 5;
    updateScreen();
    console.log("Match opened");
};

function patlat() {
    confetti({
        particleCount: 150,
        spread: 1000 
    });
}
