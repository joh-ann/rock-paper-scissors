document.addEventListener('DOMContentLoaded', function () {
    hideChangeGameBtn();
});

// QUERY SELECTORS
var playerScore = document.querySelector(".player-score");
var computerScore = document.querySelector(".computer-score");
var resultMsg = document.querySelector(".result");
var changeGameBtn = document.querySelector(".change-game");
var intro = document.querySelector(".intro");
var choose = document.querySelector(".choose");

// TOKENS
var rock = document.querySelector("#Rock");
var paper = document.querySelector("#Paper");
var scissors = document.querySelector("#Scissors");
var fish = document.querySelector("#Fish");
var alien = document.querySelector("#Alien");

// EVENT LISTENERS
choose.addEventListener('click', getChoice);
intro.addEventListener('click', handleGameMode);
changeGameBtn.addEventListener('click', changeGame);


// VARIABLES
var buttonsDisabled = false;
var currentMode = ""

// DATA MODEL
var gameData = {
    playerScore: 0,
    computerScore: 0
}

// GAME MODES
var classicMode = ["Rock", "Paper", "Scissors"];
var variationMode = ["Rock", "Paper", "Scissors", "Fish", "Alien"];

// FUNCTIONS
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

function handleGameMode(event) {
    if (event.target.classList.contains("classic")) {
        currentMode = "classic"
        chooseClassic(event);
        updateStatus('Classic: Choose your fighter!');
    }
    if (event.target.classList.contains("variation")) {
        currentMode = "variation"
        chooseVariation(event);
        updateStatus('Variation: Choose your fighter!');
    }
    displayTokens();
}

function getWinner(choice, compChoice) {
    if (choice === compChoice) {
        return 'draw';
    }

    var winConditions = {
        classic: {
            Rock: "Scissors",
            Paper: "Rock",
            Scissors: "Paper"
        },
        variation: {
            Rock: ['Scissors', 'Fish'],
            Paper: ['Rock', 'Alien'],
            Scissors: ['Paper', 'Fish'],
            Fish: ['Paper', 'Alien'],
            Alien: ['Scissors', 'Rock']
        }
    }

    if (winConditions[currentMode][choice].includes(compChoice)) {
        return 'player';
    } else {
        return 'computer';
    }
}

function getResult(game, choice, compChoice) {
    var result = getWinner(choice, compChoice);

    if (result === 'draw') {
        updateStatus(`<strong>It's a DRAW.</strong> You both chose ${choice}.`);
    } else if (result === 'player') {
        game.human.isWinner = true;
        updateStatus(`<strong>You WIN!</strong> Computer chose ${compChoice}.`);
    } else {
        game.computer.isWinner = true;
        updateStatus(`<strong>You LOSE.</strong> Computer chose ${compChoice}.`);
    }
}

function updateScore(game) {
    if (game.human.isWinner === true && game.computer.isWinner === false) {
        gameData.playerScore += 1;
        updateWins(game.human);
    }
    if (game.human.isWinner === false && game.computer.isWinner === true) {
        gameData.computerScore += 1;
        updateWins(game.computer);
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
    var compChoice = getComputerChoice();
    var human = createPlayer('Human', choice);
    var computer = createPlayer('Computer', compChoice);
    var game = createGame(human, computer);

    updateStatus(`Computer is deciding...`);
    showPlayerToken(choice);
    // Prevent spam clicking
    buttonsDisabled = true; 

    setTimeout(function() {
        getResult(game, choice, compChoice)
        tokenFight(choice, compChoice)
        updateScore(game);
        resetGame(game);
        displayChangeGameBtn();

        setTimeout(function() {
            updateStatus(`Choose your fighter!`);
            displayTokens();
            // Re-enable button                
            buttonsDisabled = false;
        }, 2000);
    }, 2000);
}


function getComputerChoice() {
    var classicMode = ["Rock", "Paper", "Scissors"];
    var variationMode = ["Rock", "Paper", "Scissors", "Fish", "Alien"];

    if (currentMode === "classic") {
        mode = classicMode;
    } else if (currentMode === "variation") {
        mode = variationMode;
    }
    var randomIndex = Math.floor(Math.random() * mode.length);
    return mode[randomIndex];
}

function updateStatus(result) {
    resultMsg.innerHTML = result;
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
    hideElement(intro);
    hideElement(fish);
    hideElement(alien);
    showElement(choose);

}

function chooseVariation() {
    hideElement(intro);
    showElement(choose);
}

function changeGame() {
    showElement(intro);
    hideElement(choose);
}

function hideChangeGameBtn() {
    hideElement(changeGameBtn);
}

function displayChangeGameBtn() {
    showElement(changeGameBtn);
}

function showPlayerToken(choice) {
    choose.innerHTML = `<img src="assets/${choice}.png" alt="${choice}" class="token" id="${choice}">`
}

function tokenFight(choice, compChoice) {
    choose.innerHTML = `<img src="assets/${choice}.png" alt="${choice}" class="token" id="${choice}">`
    choose.innerHTML += `<img src="assets/${compChoice}.png" alt="${compChoice}" class="token" id="${compChoice}">`
}

function displayTokens() {
    choose.innerHTML = ``;
    if (currentMode === "classic") {
        choose.innerHTML = 
        `<img src="assets/Rock.png" alt="Rock" class="token" id="Rock">
        <img src="assets/Paper.png" alt="Paper" class="token" id="Paper">
        <img src="assets/Scissors.png" alt="Scissors" class="token" id="Scissors">`
    }
    if (currentMode === "variation") {
        choose.innerHTML = `<img src="assets/Rock.png" alt="Rock" class="token" id="Rock">
        <img src="assets/Paper.png" alt="Paper" class="token" id="Paper">
        <img src="assets/Scissors.png" alt="Scissors" class="token" id="Scissors">
        <img src="assets/Fish.png" alt="Fish" class="token" id="Fish">
        <img src="assets/Alien.png" alt="Alien" class="token" id="Alien">`
    }
}

function showElement(element) {
    element.classList.remove("hidden");
}

function hideElement(element) {
    element.classList.add("hidden");
}