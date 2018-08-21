# How to contribute

The files in this repository are used as the starting point for all students. Because we want students to write the majority of the code themselves, pull requests (most likely) will _not_ be merged into the project.

8-8-2018 collabration with Rachel and Sonam 
cards won't toggle now app.js:47 Uncaught TypeError: Cannot read property 'contains' of undefined
we do not understand why in Sandra's walkthrough is has 'disable' in her code 

8/9/2018 worked with Rachel Bon my matches, modified the HTML and took out the open, show and matched so that cards would not start. reviewed Sandra's walkthrough and code, and have some questions about the discard 

8/11/2018 worked with Gina Ruark on my shuffle function 
Started the psuedo code for starting my game 
need to define the function clearGame, amd modfiy the shuffle array that Udacity provided 
During the co-hort meetup on saturday Julie clarified why I need to have the disable in my code.
disable makes it so that the cards can not be flipped back over once they are matched so that is why in Sandra's walkthrough she has disabled

8/13/2018 added match function but now my cards will not flip again at least the anchor
trying to figure out how to read the DOM
It is showing that I have the leaf open and it is showing anchor as open,show
really need to get better at Dom manipulation 

8/17/2018

Worked with Rachel during a zoom session and we finally got the stars working
But my stars disappear after one click
need to work on this and get it fixed 

8/19/2018
Andy G [FEND] 
Hey @thenewmona {FEND}Michigan you can add `margin: 0 auto;` to your .container class and that seems to do the trick :mario_luigi_dance:
Game is now centered 
need to work on getting the game to fill the page, so you don't have to scroll up and down on it 

8/20/2018
Notes from Stacy in the study room 
Alright, I'm taking a look at it now. My thing to note, going by what you said, is that the computer will do what you told it to. So, if it does something wrong, then the instructions are wrong.

More details after I've gone through.

I'm to look at mem.js, right? Always good to make things clear and easy for someone helping you, then they can better help you.

I see this:

function hideStar() {
    let starsList = document.querySelectorAll('.stars li')
    for (stars of starsList) {
        if (stars.style.display !== 'none') {
            stars.style.display = 'none';
            break; //need to find out what break does 
        }
    }
}
This is currently removing 1 star each time it is run. (And that's what break does, it kills the loop. So after 1 match, the loop is broken out of.)

What you'll want to do is only try to hide a star if a certain number of moves is met. To complete the game with cheating or pure luck, it would take 8 moves. So you may want to give a bit more leeway for someone who gets 3 stars, since some mistakes will be made. Then decrease from there.

For the timer, you're going to want to make use of setInterval() and clearInterval().

setInterval() works a lot like setTimeout() does, but it keeps repeating itself. It will only stop once clearInterval() is called on its ID. You can see an example of this here: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval

You can try to get the timer to work in the console, and then after that's working correctly, then try to add it to the page itself. You may find that an easier approach.

(As in, use console.log() to see what's going on, and then later work out actually putting it visible on the page.)

Please let me know if this is clear or not. If not or you have more questions, please let me know.

I recommend this read for helping new programmers to more clearly ask for help: http://blog.codeunion.io/2014/09/03/teaching-novices-how-to-debug-code/