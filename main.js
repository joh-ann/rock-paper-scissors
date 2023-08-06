document.addEventListener('DOMContentLoaded', function () {

});

// Variables
var buttonsDisabled = false;
var currentMode = ""

// Query Selectors
var playerScore = document.querySelector(".player-score");
var computerScore = document.querySelector(".computer-score");
var resultMsg = document.querySelector(".result");
var changeGameBtn = document.querySelector(".change-game");
var intro = document.querySelector(".intro");
var choose = document.querySelector(".choose");
var main = document.querySelector("main");

// Buttons
var rock = document.querySelector("#Rock");
var paper = document.querySelector("#Paper");
var scissors = document.querySelector("#Scissors");
var fish = document.querySelector("#Fish");
var alien = document.querySelector("#Alien");

// Event Listeners
choose.addEventListener('click', getChoice);
intro.addEventListener('click', function(event) {
    if (event.target.classList.contains("classic")) {
        currentMode = "classic"
        chooseClassic(event);
        updateStatus('Choose your fighter!');
    }
    if (event.target.classList.contains("variation")) {
        currentMode = "variation"
        chooseVariation(event);
        updateStatus('Choose your fighter!');
    }
});
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
    var resDraw = `<strong>It's a DRAW.</strong> You both chose ${choice}.`
    var resWin = `<strong>You WIN!</strong> Computer chose ${compChoice}.`
    var resLoss = `<strong>You LOSE.</strong> Computer chose ${compChoice}.`

    if (currentMode === "classic") {
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
    if (currentMode === "variation") {
        if (choice === compChoice) {
            updateStatus(resDraw);
        }
        else if ((choice === 'Rock' && (compChoice === 'Scissors' || compChoice === 'Fish'))) {
            game.human.isWinner = true
            updateStatus(resWin);
        }
        else if ((choice === 'Paper' && (compChoice === 'Rock' || compChoice === 'Alien'))) {
            game.human.isWinner = true
            updateStatus(resWin);
        }
        else if ((choice === 'Scissors' && (compChoice === 'Paper' || compChoice === 'Fish'))) {
            game.human.isWinner = true
            updateStatus(resWin);
        }
        else if ((choice === 'Fish' && (compChoice === 'Paper' || compChoice === 'Alien'))) {
            game.human.isWinner = true
            updateStatus(resWin);
        }
        else if ((choice === 'Alien' && (compChoice === 'Scissors' || compChoice === 'Rock'))) {
            game.human.isWinner = true
            updateStatus(resWin);            
        } else {
            game.computer.isWinner = true
            updateStatus(resLoss);
        }
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
    if (buttonsDisabled) {
        return;
    }

    var choice = event.target.getAttribute("id");
    if (currentMode === "classic") {
        var compChoice = getComputerChoice();
    } else if (currentMode === "variation") {
        var compChoice = getComputerChoiceVariation();
    }

    if (choice) {
        human = createPlayer('Human', choice);
        computer = createPlayer('Computer', compChoice);
        var game = createGame(human, computer);
        updateStatus(`Computer is deciding...`);
        hideTokens(choice);

        // Prevent spam clicking
        buttonsDisabled = true; 

        setTimeout(function() {
            getResult(game, choice, compChoice)
            displayTokens(choice, compChoice)
            updateScore(game);
            resetGame(game);
            // Re-enable button
            buttonsDisabled = false;

            setTimeout(function() {
                updateStatus(`Choose your fighter!`);
                if (currentMode === "classic") {
                    showClassicTokens();
                } else if (currentMode === "variation") {
                    showAllTokens();
                }
            }, 2000);
        }, 2000);
    }
}

function getComputerChoice() {
    var rps = ["Rock", "Paper", "Scissors"];
    var randomIndex = Math.floor(Math.random() * rps.length);
    var compChoice = rps[randomIndex];
    // console.log(compChoice)
    return compChoice;
}

function getComputerChoiceVariation() {
    var rpsVar = ["Rock", "Paper", "Scissors", "Fish", "Alien"];
    var randomIndex = Math.floor(Math.random() * rpsVar.length);
    var compChoice = rpsVar[randomIndex];
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

function chooseClassic() {
    intro.classList.add("hidden");
    choose.classList.remove("hidden");
    fish.classList.add("hidden");
    alien.classList.add("hidden");
}

function chooseVariation() {
    intro.classList.add("hidden");
    choose.classList.remove("hidden");
}

function changeGame() {
    location.reload()
}

function hideTokens(choice) {
    var humanToken = choice;
    rock.classList.add("hidden");
    paper.classList.add("hidden");
    scissors.classList.add("hidden");
    fish.classList.add("hidden");
    alien.classList.add("hidden");
    document.getElementById(humanToken).classList.remove("hidden");
}

function displayTokens(choice, compChoice) {
    var humanToken = choice;
    var compToken = compChoice;
    document.getElementById(humanToken).classList.remove("hidden");
    document.getElementById(compToken).classList.remove("hidden");
}

function showClassicTokens() {
    rock.classList.remove("hidden");
    paper.classList.remove("hidden");
    scissors.classList.remove("hidden");
}

function showAllTokens() {
    rock.classList.remove("hidden");
    paper.classList.remove("hidden");
    scissors.classList.remove("hidden");
    fish.classList.remove("hidden");
    alien.classList.remove("hidden");
}
