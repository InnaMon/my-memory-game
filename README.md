# **Memory Game Project**

## **Table of Contents**

* Installation
* How to Play!
* Edits
* Dev Tools

## Installation

No specific installation is required to play this game. Simply open the link in a browser of your choice!
Important to note that no additional libraries or dependencies were installed or required for this project. 

## How to Play!

Playing the Memory Game is very easy. Once you have the index.html file opened in a web browser, start by clicking on a card at a time and watch them flip over for a second at a time. Your goal is to successfully locate the second identical card that is hidden somewhere in the deck. Notice that as soon as you flip over your first card, the timer will begin to run. This is to keep track of how long it takes you to find all eight hidden card pairs. Make it fun and try to beat your best time :)
Also, you will notice that each time you play the game you start with three stars and a 'Moves' counter. The objective is to finish the game as fast as you can, with as few moves, and as many stars. After every eight moves, you will lose a star. Once you have successfully completed the challenge, a window will pop-up with your scores. 
Have fun!!!

## Edits

If you would like to make the game more or less difficult, simply open the chrome dev tools and find the starRating function. Within that function, edit the moveCounter by either increasing or decreasing the number it is equal to. Currently, it is set to eight total moves before you lose one star and 16 total moves before you lose the second star. 

This is what the JavaScript code will look like:

function starRating() {
    if (moveCounter === 8 || moveCounter === 16 
    ){
        hideStar(); 
    }
}

Here are the specific steps laid out for you if you were to use Chrome Dev Tools:
1. type starRating in the console and press enter twice
2. click on the displayed function (it will take you to the JavaScript file)
3. Change the 8 and 16 to desired number

## Dev Tools

Dev tools are developer tools built into the web browser. It provides access to the html, css, and javascript files associated with the application. Utilizing these tools allows the user to make temporary changes to the web page. Remember, after refreshing the page any changes made will NOT be saved!