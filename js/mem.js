const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false; //this is so the cards won't flip back once they are matched 
let firstCard, secondCard;
let timeStart = "";
let matchCount = 0; //added by Carlos


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

//if => 8 modal popup 
function disableCards() {
    firstCard.removeEventListener('click', flipCard); //remove the eventListener if it's a match. You have to add the event and the function that you called 
    secondCard.removeEventListener('click', flipCard); //remove the eventListener if it's a match
    resetCard();
    matchCount++;
    console.log(matchCount);
    if (matchCount >= 8) {
        console.log('Game over!');
        stopTimer();
        //modal needs to pop up 
    }
}

//function showModal() { 9/1 not sure why this is here

//}

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
//let stopTimer = false;//need this for the timer and the reset 
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
                // if (stopTimer) {
                //     document.querySelector(".timer").innerHTML = "00:00";
                //     timer = 0;
                //     hour = 0;
                //     minute = 0;
                //     second = 0;
                //     return;
                // showTimer();
                // }
            }, 1000);
        }
    }
}

function resetTimer() {
    document.querySelector(".timer").innerHTML = '00:00';
}

function stopTimer() {
    clearInterval(timeStart); //clearInterval needs to use the variable from the setInterval 
    timeStart = '';
}
//get modal element

let modal = document.getElementById('simpleModal');

// get open modal button don't need this for memory game 

let modalBtn = document.getElementById('modalBtn'); //don't need this for memory game

//get close button 

let closeBtn = document.getElementsByClassName('closeBtn')[0];

//Listen for open click

modalBtn.addEventListener('click', openModal); //don't need this for memory game

//Listen for close click
closeBtn.addEventListener('click', closeModal);

//listen for outside click

window.addEventListener('click', outsideClick);

//function to open Modal
function openModal() {
    modal.style.display = 'block';// this is rendered as a block level element 
}

//function to close Modal
function closeModal() {
    modal.style.display = 'none';//element will not be displayed 
}
//function to close Modal if outside click
function outsideClick(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}


//modal needs to popup on line 58 JS per Carlos
//     moves = 8; //per Carlos

//open and close modal using toggle  https://www.w3schools.com/jquery/html_toggleclass.asp
//line 210 openModal()
//line 215 closeModal()function

// function modalPopUp () {
//     let toggleModal = document.querySelector('.modal-body');
//     modal.classList.toggle('hide');
//}//line 63 HTML
// }
//   showTimer();//137 JS
//   modalPopUp();//232 JS

// modal stats display time /moves/stars

//   function displayStats() { 
//261 JS need to create HTML class 
//         1.timer .timer 43 HTML
//  let timeStat = document.querySelector('.timer');
//         2.moves .moves 67 HTML 
//  let movesStat = document.querySelector('.moves');
//        3.stars  .stars 70 HTML 
//  let starsStat = document.querySelector('.stars');
//display clock time .clock 66 HTML
//  let clockTime = document.querySelector('.clock');
// let stars = getStars();//254 JS

//  timeStat.innerHTML = `Time = ${clockTime}`;
//  movesStat.innerHTML = `Moves = ${moves}`;
//  starsStat.innerHTML = `Stars = ${stars}`;
// }


//show the number of stars left on the modal 


//displayStats();//245 JS

//reset game - reset clock - moves -stars- reshuffle the cards 

// reset timer line 44 HTML line 178 JS
//function resetTimer() {
//     stopTimer();//182 JS
//     timerOff = true;
//     time = 0;
//     showTimer();//137 JS
// } 

//reset moves line 68 HTML
//function resetMoves() { 
//moves = 0;
//document.querySelecto(.'moves').innerHTML = moves;
//}

//reset stars line 72-74 HTML
// function resetStars() {
//     stars = 0;
//     let starList = document.querySelectorAll('.star li');
//     for (star of starList) {
//         star.style.display = 'inline';// default for .display 
//     }
// }

// ////game Over 
// function gameOver(){
//stopTimer();//182 JS
// modalPopUp();//238
// displayStats();//261 JS
//}

//Restart the game PlayAgain button line 53 HTML 
//line 135 JS 
//function restartGame() {
//         resetTimer();//178 JS
//          resetStars();//line 303 
//          shuffle();//95 JS
//          closeModal();//need to write the function for this declaration 
//          resetMoves(); //277 JS
//          }

//replay game - reset the game via the play again button line 54 HTML popModal
//  document.querySelector('modalBtn').addEventListener{// 200 JS
//  });//retartGame function 


cards.forEach(card => card.addEventListener('click', flipCard));
//stopTimer = true;