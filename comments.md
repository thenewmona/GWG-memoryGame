//start timer - 8/24 what is going to start the timer. 
//8/27 got the timer to start when you click a card 
//timer is now showing almost right I have 0:0 need it to show 0:00
//Timer needs to start when the first card is clicked 

// let timeStart;

//start timer - 8/24 what is going to start the timer. 
//Timer needs to start when the first card is clicked


//can see it moving in the console but it still won't move in the game
//Uncaught ReferenceError: timer is not defined
//at showTimer (mem.js:139)
//at setInterval (mem.js:149)

## 9-3 cleaning up
// get open modal button don't need this for memory game 

let modalBtn = document.getElementById('modalBtn'); //don't need this for memory game
/Listen for open click

modalBtn.addEventListener('click', openModal); //don't need this for memory game

//starting the timer
//I think I need to start the timer here because this is the start of the game 
//https://matthewcranford.com/memory-game-walkthrough-part-6-the-clock/

    //test if the cards match
    //console.log(firstCard.dataset.card);
    //console.log(secondCard.dataset.card);
    //cleaned up the code using a ternary operator 
    //if they match 


//modal needs to popup on line 58 JS per Carlos
//     moves = 8; Game Over  //8/31 per Carlos

//open and close modal using toggle  https://www.w3schools.com/jquery/html_toggleclass.asp
//line 210 openModal()
//line 215 closeModal()function

// function modalPopUp () {
//     let toggleModal = document.querySelector('.modal-body');
//     modal.classList.toggle('hide');
//}//line 63 HTML

//   showTimer();//137 JS


// modal stats display time /moves/stars
// }

//show the number of stars left on the modal 

//displayStats();//245 JS

//reset game - reset clock - moves -stars- reshuffle the cards 

// reset timer line 44 HTML line 178 JS timer stops, but does not go back to 0
// function resetTimer() {
//     stopTimer();//182 JS
//     timerOff = true;
//     time = 0;
//     showTimer();//137 JS
// } 

//reset moves line 68 HTML
// function resetMoves() { 
// moves = 0;
// document.querySelecto('.moves').innerHTML = moves;
// }

//reset stars line 72-74 HTML this way all the stars show when the game is reset 
// function resetStars() {
//     stars = 0;
//     let starList = document.querySelectorAll('.star li');//or should it be .fa fa-star li since .star is actually ul 
//     for (star of stars) {
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
// function replayGame() {
//     resetTimer(); //line 178 JS
//     resetStars(); //line 303 
//     shuffle(); //line 95 JS
//     closeModal(); //need to write the function for this declaration 
//     resetMoves(); //277 JS
// }

//replay game - reset the game via the play again button line 54 HTML popModal
//  document.querySelector('modalBtn').addEventListener{// 200 JS
//  });//retartGame function 
//hour = Math.floor(timer / 3600);
                //minute = Math.floor((timer - hour * 3600) / 60);
                //second = timer - hour * 3600 - minute * 60;
                //if (hour < 10) hour = '0' + hour;
                //if (minute < 10) minute = '0' + second;