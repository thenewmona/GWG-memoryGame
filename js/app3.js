const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false; //this is so the cards won't flip back once they are matched 
let firstCard, secondCard;


//lets us know which card the player clicked so that we can do the match 

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return; //https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval#The_this_problem

    this.classList.add('flip');

    //this keyword is dynamically set to this context
    //it is representing memory card element which is was fired
    //toggle means if the class is there remove it, if it's not there then add it 
    //not really understanding how .this works 

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
        //startTimer();
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
let stopTimer = false;//need this for the timer and the reset 
let resetGame = true; //need this for game reset and modal 

function showTimer() {
    let timer = document.querySelector('.timer');
    // let minutes = Math.floor(time / 60);
    // let seconds = Math.floor(time % 60);
    //console.log(timer);
    timer.innerHTML = minutes + ':' + seconds;
}

function startTimer() {
    if (resetGame == true) {        
        let timer = 0;
        let hour = 0;
        let minute = 0;
        let second = 0;
        timeStart = setInterval(() => {//8-30 if i use => timer works, change it per https://www.w3schools.com/js/js_timing.asp it acts like it wants to start but doesnt
            ++timer;
            hour = Math.floor(timer / 3600);
            minute = Math.floor((timer - hour * 3600) / 60);
            second = timer - hour * 3600 - minute * 60;
            if (hour < 10) hour = '0' + hour;
            if (minute < 10) minute = '0' + second;
            document.querySelector(".timer").innerHTML = hour + ':' + minute + ':' + second;
            if (stopTimer) {
                document.querySelector(".timer").innerHTML = "00:00";
                timer = 0;
                hour = 0;
                minute = 0;
                second = 0;
                return;
            showTimer();
            }
        },1000);
    }
}

// function stopTimer() {
//     clearInterval(timeStart); //clearInterval needs to use the variable from the setInterval 
// }
//stopTimer();

/*
 * Stop the game timer and return seconds elapsed
 */


//reset game - reset clock - moves -stars- reshuffle the cards 
//reset timer - stopTimer 
//reset moves = 0
//reset stars = 0
//reset cards

//game over - stop clock - modal pop's up 

//replay game


cards.forEach(card => card.addEventListener('click', flipCard));
//stopTimer = true;