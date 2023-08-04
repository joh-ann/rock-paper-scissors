document.addEventListener('DOMContentLoaded', function () {

});

// Query Selectors
var playerScore = document.querySelector(".player-score");
var computerScore = document.querySelector(".computer-score");
var resultMsg = document.querySelector(".result");
var changeGameBtn = document.querySelector(".change-game");
var intro = document.querySelector(".intro");
var choose = document.querySelector(".choose");
var main = document.querySelector("main");

// Buttons
var rock = document.querySelector("#rock");
var paper = document.querySelector("#paper");
var scissors = document.querySelector("#scissors");

// Event Listeners
choose.addEventListener('click', getChoice);
intro.addEventListener('click', function(event) {
    if (event.target.classList.contains("classic")) {
        chooseClassic(event)
    }
    if (event.target.classList.contains("variation")) {
        chooseVariation(event)
    }
})
changeGameBtn.addEventListener('click', changeGame);

// Data Model
var gameData = {
    playerScore: 0,
    computerScore: 0
}

// Functions
function createPlayer(name, choice) {
    var player = {
        name: name,
        choice: choice,
    }
    return player
}

function createGame(human, computer) {
    var game = {
        human: {
            name: 'Human',
            choice: human.choice,
            isWinner: false,
        },
        computer: {
            name: 'Computer',
            choice: computer.choice,
            isWinner: false,
        }
    }
    return game;
}

function getResult(game, choice, compChoice) {
    var resDraw = `<strong>It's a DRAW!</strong> You both chose ${choice}.`
    var resWin = `<strong>You WIN!</strong> Computer chose ${compChoice}.`
    var resLoss = `<strong>You LOSE!</strong> Computer chose ${compChoice}.`

    if (choice === compChoice) {
        updateStatus(resDraw);
    }
    else if (choice === 'Rock' && compChoice === 'Scissors') {
        game.human.isWinner = true
        updateStatus(resWin);
    }
    else if (choice === 'Paper' && compChoice === 'Rock') {
        game.human.isWinner = true
        updateStatus(resWin);
    }
    else if (choice === 'Scissors' && compChoice === 'Paper') {
        game.human.isWinner = true
        updateStatus(resWin);
    } else {
        game.computer.isWinner = true
        updateStatus(resLoss);
    }
}

function updateScore(game) {
    if (game.human.isWinner === true && game.computer.isWinner === false) {
        var human = game.human;
        gameData.playerScore += 1;
        updateWins(human);
        return game;
    }
    if (game.human.isWinner === false && game.computer.isWinner === true) {
        var computer = game.computer;
        gameData.computerScore += 1;
        updateWins(computer);
        return game;
    }
    if (game.human.isWinner === false && game.computer.isWinner === false) {
        playerScore.style.color = 'black';
        computerScore.style.color = 'black';
    }
}

function resetGame(game) {
    game.human.isWinner = false;
    game.computer.isWinner = false;
    return game;
}

function getChoice(event) {
    var choice = event.target.getAttribute("id");
    var compChoice = getComputerChoice();
    var compMsg = `Computer is deciding...`
    if (choice) {
        human = createPlayer('Human', choice);
        computer = createPlayer('Computer', compChoice);
        var game = createGame(human, computer);
        updateStatus(compMsg)
        setTimeout(function() {
        getResult(game, choice, compChoice)
        updateScore(game);
        resetGame(game);
        }, 2000)
    }
}

function getComputerChoice() {
    var rps = ["Rock", "Paper", "Scissors"];
    var randomIndex = Math.floor(Math.random() * rps.length);
    var compChoice = rps[randomIndex];
    // console.log(compChoice)
    return compChoice;
}

function updateStatus(result) {
    resultMsg.innerHTML = result
}

function updateWins(winner) {
    if (winner.name === 'Human') {
        playerScore.innerText = gameData.playerScore;
        playerScore.style.color = 'green';
        computerScore.style.color = 'black';
    }
    if (winner.name === 'Computer') {
        computerScore.innerText = gameData.computerScore;
        computerScore.style.color = 'green';
        playerScore.style.color = 'black';
    }
}

function chooseClassic(event) {
    intro.classList.add("hidden");
}

function chooseVariation(event) {
    intro.classList.add("hidden");
}

function changeGame() {
    location.reload()
}