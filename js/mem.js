const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false; //this is so the cards won't flip back once they are matched 
let firstCard, secondCard;
let time = 0;
let timer;

//lets us know which card the player clicked so that we can do the match 

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return; //https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval#The_this_problem

    this.classList.add('flip');


    //this keyword is dynamically set to this context
    //it is representing memory card element which is was fired
    //toggle means if the class is there remove it, if it's not there then add it 
    //not really understanding how .this works 

    if (!hasFlippedCard) { //first click
        hasFlippedCard = true;
        firstCard = this;
        return;
        
    }
   
    //second click        
    secondCard = this;
    checkForMatch();
    addMove();
    removeStars();
}
//starting the timer
//I think I need to start the timer here because this is the start of the game 
//https://matthewcranford.com/memory-game-walkthrough-part-6-the-clock/


// matching the cards - refactoring 
//determining if the the cards match 
// using the data attribute within the HTML to do this 
function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card; //this is if its a match


    //test if the cards match
    //console.log(firstCard.dataset.card);
    //console.log(secondCard.dataset.card);
    //cleaned up the code using a ternary operator 
    //if they match 
    isMatch ? disableCards() : unflipCards();

}

function disableCards() {
    firstCard.removeEventListener('click', flipCard); //remove the eventListener if it's a match. You have to add the event and the function that you called 
    secondCard.removeEventListener('click', flipCard); //remove the eventListener if it's a match
    resetCard();

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

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

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
    let starsList = document.querySelectorAll('.stars li')
    for (stars of starsList) {
        if (stars.style.display !== 'none') {
            stars.style.display = 'none';
            break; //need to find out what break does 
        }
    }
}
removeStars();

//timer https://www.w3schools.com/js/js_timing.asp
//start timer 

//can see it moving in the console but it still won't move in the game
//Uncaught ReferenceError: timer is not defined
//at showTimer (mem.js:139)
//at setInterval (mem.js:149)

//show timer

function showTimer() {
    let timer = document.querySelector('.timer');
    //console.log(timer);
    timer.innerHTML = time;
}
let minutes = Math.floor(time / 60);
let seconds = Math.floor(time % 60);
 //start timer - 8/24 what is going to start the timer. 
//Timer needs to start when the first card is clicked 
let timeStart;

//start timer - 8/24 what is going to start the timer. 
//Timer needs to start when the first card is clicked 


function startTimer() {
    timeStart = setInterval(() => { //setInterval repeats execution of the funtion
        time++;
        showTimer();
        console.log(time);
    }, 1000);
}
startTimer();



//stop timer



//reset game - reset clock - moves -stars- reshuffle the cards 
//reset timer - stopTimer 
//reset moves = 0
//reset stars = 0
//reset cards

//game over - stop clock - modal pop's up 

//replay game


cards.forEach(card => card.addEventListener('click', flipCard));