const cards = document.querySelectorAll('.memory-card');
const restartBtn = document.querySelector('resetBtn');
let hasFlippedCard = false;
let lockBoard = false; //this is so the cards won't flip back once they are matched 
let firstCard, secondCard;
let timeStart = "";
let matchCount = 0; //added by Carlos
//let resetBtn;

//lets us know which card the player clicked so that we can do the match 

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return; //https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval#The_this_problem

    this.classList.add('flip');

    if (!hasFlippedCard) { //first click !
        hasFlippedCard = true;
        firstCard = this;
        startTimer();
        return;

    }

    //second click        
    secondCard = this;
    checkForMatch();
    addMove();
    removeStars();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card; //this is if its a match
    isMatch ? disableCards() : unflipCards();
}

//if => 8 modal popup still need to configure this 
function disableCards() {
    firstCard.removeEventListener('click', flipCard); //remove the eventListener if it's a match. You have to add the event and the function that you called 
    secondCard.removeEventListener('click', flipCard); //remove the eventListener if it's a match
    resetCard();
    matchCount++;
    console.log(matchCount);
    //if matchCount equals 8, all cards have been successfully matched and the game is over.
    if (matchCount >= 8) {
        gameOver();

    }
}



function gameOver() {
    stopTimer();
    openModal();
}


// if they don't match 
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        //so that we can see the card flip
        // setTimeout excutes after waiting a specified amount of time
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetCard();

    }, 700);
}

function resetCard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
}

let moves = 0;

function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}
if (hasFlippedCard.length === 2) {
    //checkForMatch(clickTarget);

}

function removeStars() {
    if (moves === 10 || moves === 20 || moves === 30) {
        removeStar();

    }
}

function removeStar() {
    let starsList = document.querySelectorAll('.stars li');
    for (stars of starsList) {
        if (stars.style.display !== 'none') {
            stars.style.display = 'none';
            break; //need to find out what break does 

        }
    }
}
removeStars();

//timer 
//let stopTimer = false;//need this for the timer and the reset 
let resetGame = true; //need this for game reset and modal 

let hour = 0;
let minute = 0;
let second = 0;

function restartGame() {
    if (timeStart) stopTimer();
    resetTimer();
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
    shuffle();
    matchCount = 0;
    moves = 0;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
  
}
//restartBtn = document.getElementsByClassName("resetBtn");

restartBtn.addEventListener('click', function(e) {
});
    restartBtn = document.getElementsByClassName("resetBtn");

function startTimer() {
    if (resetGame == true) {
        let timer = 0;  
        if (timeStart === "") {
            timeStart = setInterval(() => { //8-30 if i use => timer works, change it per https://www.w3schools.com/js/js_timing.asp it acts like it wants to start but doesnt
                ++timer;
                second = timer % 60;
                minute = Math.floor(timer / 60);
                if (minute < 10) minute = '0' + minute;
                if (second < 10) second = '0' + second;
                //hour = Math.floor(timer / 3600);
                //minute = Math.floor((timer - hour * 3600) / 60);
                //second = timer - hour * 3600 - minute * 60;
                //if (hour < 10) hour = '0' + hour;
                //if (minute < 10) minute = '0' + second;
                document.querySelector(".timer").innerHTML = minute + ':' + second;
                document.querySelector(".clock").innerHTML = minute + ':' + second;
            }, 1000);
        }
    }
}

function resetTimer() {
    document.querySelector(".timer").innerHTML = '00:00';
    [hour, minute, second] = [0,0,0];
}

function stopTimer() {
    clearInterval(timeStart); //clearInterval needs to use the variable from the setInterval 
    timeStart = '';
}
//get modal element


let modal = document.getElementById('simpleModal');


//get close button 

let closeBtn = document.getElementsByClassName('closeBtn')[0];


//Listen for close click
closeBtn.addEventListener('click', closeModal);

//listen for outside click

window.addEventListener('click', outsideClick);

//function to open Modal
function openModal() {
    modal.style.display = 'block'; // this is rendered as a block level element 
}

//function to close Modal
function closeModal() {
    modal.style.display = 'none'; //element will not be displayed 
}
//function to close Modal if outside click
function outsideClick(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}

shuffle();
cards.forEach(card => card.addEventListener('click', flipCard));
