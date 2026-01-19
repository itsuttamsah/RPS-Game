// ----------------------SCORE----------------
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
updateScoreBoard();


// ----------------------PLAY GAME ----------------
function playGame(playerMoves) {
    let computerMoves = pickComputerMoves();
    let result = '';


    if(playerMoves === 'rock') {
        if(computerMoves === 'rock') result = 'Tie';
        else if(computerMoves === 'paper') result = 'You Lose';
        else if(computerMoves === 'scissors') result = 'You Win';
    }

    else if(playerMoves === 'paper') {
        if(computerMoves === 'paper') result = 'Tie';
        else if(computerMoves === 'scissors') result = 'You Lose';
        else if(computerMoves === 'rock') result = 'You Win';
    }

    else if(playerMoves === 'scissors') {
        if(computerMoves === 'scissors') result = 'Tie';
        else if(computerMoves === 'rock') result = 'You Lose';
        else if(computerMoves === 'paper') result = 'You Win';
    }

    if(result === 'You Win') {
        score.wins += 1;
    }
    else if(result === 'You Lose') {
        score.losses += 1;
    }
    else if(result === 'Tie') {
        score.ties += 1;
    }

    saveData();

    document.querySelector('.js-result')
        .innerHTML = `${result}`;

    document.querySelector('.js-moves')
        .innerHTML = `You <img src="images/${playerMoves}-emoji.png" class="display-emoji"> <img src="images/${computerMoves}-emoji.png" class="display-emoji"> Computer`;

        updateScoreBoard();
}

//---------------------COMPUTER MOVE----------
function pickComputerMoves(){
    let randomNumber = Math.random();
    if(randomNumber < 1 / 3)
        return 'rock';
    else if(randomNumber < 2 / 3)
        return 'paper';
    else 
        return 'scissors';
}

//-------------------ScoreBoard-------------------------
function updateScoreBoard(){
    document.querySelector('.js-score-board')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}


// ------------------STORAGE---------------------------
function saveData(){
    localStorage.setItem('score', JSON.stringify(score));
}


// --------------------RESET SCORE -----------------
function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    localStorage.removeItem('score');

    updateScoreBoard();

}


// ----------------------RESET COMFIRMATION-------------
function showResetConfirmation(){
    document.querySelector('.js-reset-confirmation')
        .innerHTML = `
            <p class="js-reset-confirm">
                Are you sure you want to reset score? 
                <button class="js-reset-confirm-yes">
                    Yes
                </button> 
                <button class="js-reset-confirm-no">
                    No
                </button>
            </p>

        `;

        document.querySelector('.js-reset-confirm-yes')
            .addEventListener('click', () => {
                resetScore();
                hideResetConfirmation();
            });

        document.querySelector('.js-reset-confirm-no')
            .addEventListener('click', () => {
                hideResetConfirmation();
            });
}

function hideResetConfirmation(){
    document.querySelector('.js-reset-confirmation').innerHTML = '';
}


//--------------------AUTOPLAY-------------------
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if(!isAutoPlaying){
        clearInterval(intervalId);
        intervalId = setInterval(() => {
            const playerMoves = pickComputerMoves();
            playGame(playerMoves);
        }, 1000);
        document.querySelector('.js-auto-play')
            .textContent = 'Stop Playing';
        isAutoPlaying = true;
    }
    else {
        clearInterval(intervalId);
        document.querySelector('.js-auto-play')
            .textContent = 'Auto Play';
        isAutoPlaying = false;
    }
}


//-----------------EVENT HANDLERS ------------------
document.querySelector('.js-moves-rock')
    .addEventListener('click', () => {
        playGame('rock');
    });

document.querySelector('.js-moves-paper')
    .addEventListener('click', () => {
        playGame('paper');
    });

document.querySelector('.js-moves-scissors')
    .addEventListener('click', () => {
        playGame('scissors');
    });

document.querySelector('.js-reset')
    .addEventListener('click', showResetConfirmation);

document.querySelector('.js-auto-play')
    .addEventListener('click', autoPlay);


//-----------------KEYBOARDS------------------------
document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r' || event.key === 'R') {
        playGame('rock');
    } else if(event.key === 'p' || event.key === 'P'){
        playGame('paper');
    }else if(event.key === 's' || event.key === 'S'){
        playGame('scissors');
    }

    else if(event.key === 'a' || event.key === 'A') {
        autoPlay();
    }

    else if(event.key === 'Backspace'){
        showResetConfirmation();
    }

});