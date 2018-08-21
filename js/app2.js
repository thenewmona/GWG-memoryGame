const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false; //this is so the cards won't flip back once they are matched 
let firstCard, secondCard;

//lets us know which card the player clicked so that we can do the match 

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    //starting the timer
    
}
// correct time format 

// function startTimer() {
//     timerID = setInterval(() => {
//         time++;
//         displayTime();
//     }, 1000);
// }

// function timerDisplay() {
//     let clock = document.querySelector('.timer');
//     let minutes = Math.floor(time / 60);
//     let seconds = time % 60;
//     if (seconds  < 10) {
//         clock.innerHTML = `${minutes}:0${seconds}`;
//     } else {
//         clock.innerHTML = `${minutes}:${seconds}`;
//     }
// }

// //stopping the timer
// function stopTimer () {
//     clearInterval(timerID);
// }

//clearing the timer for game reset 

//this keyword is dynamically set to this context
//it is representing memory card element which is was fired
//toggle means if the class is there remove it, if it's not there then add it 

if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;
    return; }

//second click        
secondCard = this;
checkForMatch();
addMove();



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

    // firstCard.removeEventListener('click', flipCard); //remove the eventListener if it's a match. You have to add the event and the function that you called 
    //secondCard.removeEventListener('click', flipCard); //remove the eventListener if it's a match
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetCard();
    

}

// if they don't match 
function unflipCards() {
    lockBoard = true;
    setTimeout(() => { //so that we can see the card flip 
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetCard();
        removeStar();
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


function hideStars() {
    let starsList = document.querySelectorAll('.stars li')
    for (stars of starsList) {
        if (stars.style.display !== 'none') {
            stars.style.display = 'none';
            break; //need to find out what break does 
        }
    }
}
hideStars();
hideStars();

function removeStar() {
    if (moves === 16 || moves === 24) {
        hideStars();
    }
}


//const timerReset = document.querySelector(".timer");
//let timeBegin, totalSeconds = 0;
//timerReset.innerHTML =totalSeconds;

//function startTimer () {
//let timeBegin =setInterval(function() {
//increase the totalSeconds by 1
//totalSeconds++;
//updating the HTML container with e new time
// timerReset.innerHTML = totalSeconds;
//}, 1000);
//}




cards.forEach(card => card.addEventListener('click', flipCard));