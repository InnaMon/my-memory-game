//************GLOBAL SCOPE VARIABLES *************/
const deck = document.querySelector('.deck'); //refactor the code to select parent element to avoid creating too many events
let flippedCards = []; //create list of open cards
let matchedSet = 0; //keeps track of card pairs that get matched
const totalSets = 8;
let moveCounter = 0; 
const stars = document.querySelectorAll('.stars li'); //stores all star li elements in variable , removed from within hideStar function
let timer; //assign to global scope so that clearInterval can access as argument  
let totalSeconds = 0;
let timerOff = true; //turns timer  on and off with boolean, when cards toggled in event listener then timer "starts"  

//************SHUFFLE FUNCTION*************/
function shuffleCards() {
    const cardArray = [...document.querySelectorAll('.deck li')]; //turn nodeList into array using spread operator 
    const shuffledArray = shuffle(cardArray); //shuffle the array using provided shuffle method 
    for (card of shuffledArray) { //use for..of loop to loop through array and update the cards in the deck
        deck.appendChild(card); //update new shuffled cards in DOM
    }
}
shuffleCards();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) { //create shuffle funtion for array
    var currentIndex = array.length, temporaryValue, randomIndex; 
    /*create variables for loop, array.lenth=length of array, temporaryValue=hold temporary value so can swap 2 indexes in array, 
    randomIndex=hold random number to choose random index*/
    while (currentIndex !== 0) { //create while loop to iterate through array, don't want to get to zero index so decrement length of array each time
        randomIndex = Math.floor(Math.random() * currentIndex); //establish random number code
        currentIndex -= 1; //decrement
        temporaryValue = array[currentIndex]; //find target index position in loop and insert temp value
        array[currentIndex] = array[randomIndex];//take array at random index and swap for index postiion of loop
        array[randomIndex] = temporaryValue;//swap random index with temporary 
    }

    return array; //return array to see how it's shuffled
} 

 //************EVENT LISTENER*************/

 //Below code flips over selected/clicked cards using toggle method and event Listener 
deck.addEventListener('click', function(event) { //create event parameter to store event object data
    const clickCard = event.target; //listener function logs message saying that card(child) element was clicked
    if (isClickValid(clickCard)) 
    {
        if (timerOff) {
            startTimer();
            timerOff = false;
        }//triggers timer function upon even listener initiation
        toggleCard(clickCard);
        addToggleCard(clickCard);
        if (flippedCards.length === 2) { //first click flips 1 card and adds to flippedCards array. Second click flicks 2nd card and adds to flippedCards array. Once condiiton is met of 2 cards log “2 cards!” to the console.
            checkForMatch(clickCard); //call matching function every time user toggles two cards
            addMoveCounter(); //complete turn/1 move = opening both cards
            starRating();
        }
        if (matchedSet === totalSets) { //number of matched cards shoudl equal to 8, defined in global scope 
            stopTimer();
            displayStats();
            toggleModal();
        }
    }
}, false); //should I add 'false' as a third argument in addEventListener??? 

//************TOGGLING CARDS*************/
//create toggle function to increase readability and produce more efficient code
function toggleCard(card) { //refactor funtions parameter from clickCard to card element to toggle each card for match logic
    card.classList.toggle('open'); //toggle is a property of classList that adds/removes items from list if it does not yet exist 
    card.classList.toggle('show'); //Check out '.deck.card.open' and '.deck.card.show' attributes in CSS
}

function addToggleCard(clickCard) { //create function to push clickCard into flippedCards variable
    flippedCards.push(clickCard);
    console.log(flippedCards);
}

//************MATCHING CARDS*************/
function checkForMatch() { //create new function that checks if two toggled cards are the same in the index using className (stores html 'i' value)
    if (flippedCards[0].firstElementChild.className === flippedCards[1].firstElementChild.className) 
    {//className i value is inside firstElementChild node property
        flippedCards[0].classList.toggle('match'); //toggle match class on both elements [0] and [1], simply means if class 'match' doesn't yet exist then add it 
        flippedCards[1].classList.toggle('match');
        flippedCards = []; //resets the array
        matchedSet++; //increment each time a match is made
        console.log(matchedSet);
    } else  {
        setTimeout(function () { //add callback function to give 2nd flipped card to show befor expiring and turning back over 
            toggleCard(flippedCards[0]); //use toggleCard funtion and use card element as parameter to toggle card...look at above function
            toggleCard(flippedCards[1]); 
            flippedCards = []; //resets the array, has to be last, ORDER MATTERS, have to toggle cards FIRST
        }, 1000);
    }
}

function isClickValid(clickCard) {
    return ( //classList "contains" method returns boolean if class present so if 'card' class is present = true 
        clickCard.classList.contains('card') && //classList returns DOMTokenList collection of the class attributes of the element (contains "card", "open" & "show")
        !clickCard.classList.contains('match') && //prevents matched cards from being clicked and added to array
        flippedCards.length < 2 && //add additional conditional statement to ensure only 2 cards are selected at a time
        !flippedCards.includes(clickCard) //check that clickCard only toggled and added to flippedCards array IF it doesn’t already exist in that array
    );
}
//************MOVE FUNCTION *************/
function addMoveCounter() {
    moveCounter++; //increments moveCounter by one 
    const movesValue = document.querySelector('.moves'); //update 'moves' class to reflect new value on scoreboard based on moves player has made 
    movesValue.innerHTML = moveCounter;
}

//************TIMER FUNCTION *************/
function startTimer() { //timer function
    timer = setInterval(function() {
        totalSeconds++; //increments at 1 sec at a time
        displayTimer(); 
  }, 1000);
}

function displayTimer() {
    let minutes = document.querySelector('.minutes'); //stores minutes class in variable
    let seconds = document.querySelector('.seconds');//stores seconds class in variable
    seconds.innerHTML = (totalSeconds % 60); //stores the remainder when divided by 60
    minutes.innerHTML = Math.floor(totalSeconds / 60); //divides seconds by 60 to get minutes and then rounds down
}

function stopTimer() {
   clearInterval(timer);
}

//************STAR RATING FUNCTION *************/
function starRating() { //this functions checks the score before it removes any stars
    if (moveCounter === 8 || moveCounter === 16 //increase moveCounter to make game easier 
    ){
        hideStar(); 
    }
}

function hideStar() { //hide stars instead of remove to decrease repaint/reflow cost 
    for (star of stars) { //use for..of loop to iterate through star li NodeList
        if (star.style.display !== 'none') { //create conditional that checks display .style and hides it  
            star.style.display = 'none';
            break; //allows to remove only a single star at a time  instead of looping through & removing all stars continuously 
        } 
    }
}

//************MODAL POPUP *************/
function toggleModal() { //creates function to show and hide modal
    const modal = document.querySelector('.modal');
    modal.classList.toggle('hide-modal'); //no period in front of 'hide, not using queryselector but togglinh so no need to use period 
}
toggleModal()
toggleModal()

function displayStats() { //displays the stats in the modal
    const timeStat = document.querySelector('.modal-time'); //stores modal-time class in variable
    const finalMinutes = document.querySelector('.minutes').innerHTML;
    const finalSeconds = document.querySelector('.seconds').innerHTML;
    const starStat = document.querySelector('.modal-stars');
    const starGetter = getStars(); //create function that counts how many stars are left
    let moveStat = document.querySelector('.modal-moves'); //stores modal-moves class in variable

    timeStat.innerHTML = `Time = ${finalMinutes}:${finalSeconds}`; //displays timer once player wins 
    starStat.innerHTML = `Stars = ${starGetter}`; //display number of stars left 
    moveStat.innerHTML = `Moves = ${moveCounter}`; //displays number of moves in modal
}
displayStats()

function getStars() {
    starCounter = 0; //create varibale that counts how many stars are left 
    for (star of stars) { //loop through star list
        if (star.style.display !== 'none') { //create conditional that checks display .style and hides it
            starCounter++; //every time the display = none for a star element, increment by 1
        }
    }
    return starCounter;//without it returns 'undefined', stops executing the function
}

//************REPLAY/REFRESH*************/
function refresh() { //create new function to refresh game withOUT toggling modal
    refreshTimer();
    refreshCounter();
    refreshStars();
    shuffleCards();//shuffles all the cards in the deck to start new game
    newSetOfCards();
}

function refreshTimer() {
    stopTimer(); //resets timer
    timerOff = true;
    totalSeconds = 0;
    displayTimer();
    matchedSet = 0;//clear matchedSet and start over
}

function refreshCounter() {
    moveCounter = 0; //resets moves displayed 
    document.querySelector('.moves').innerHTML = moveCounter; //replaces number of diaplyed moves to 0
}

function refreshStars() {
    starCounter = 0; //resets stars displayed 
    for (star of stars) { //starList instead of stars?
        star.style.display = 'inline';
    }
}

function playAgain() { //refreshes the game, removes modal, and refreshes cards in .deck li
    refresh();
    toggleModal();
    newSetOfCards();
    console.clear();//clear console to determine if new set of cards it being matched
}

const restart = document.querySelector('.restart');//restarts game once player hits the refresh icon above deck of cards

restart.addEventListener('click', refresh);

const replay = document.querySelector('.modal-replay'); //store modal-replay class in variable and add even listener to replay game

replay.addEventListener('click', playAgain); //restarts game once player hits "play again" button

const exit = document.querySelector('.modal-close'); //store modal-close class in variable and add event listener to close modal

exit.addEventListener('click', playAgain); 

function newSetOfCards() {
    const listOfCards = document.querySelectorAll('.deck li');
    for (card of listOfCards) {
        card.className = 'card';
    }
}

//TO DO: dd CSS animations when cards are clicked, unsuccessfully matched, and successfully matched to make project stand out
