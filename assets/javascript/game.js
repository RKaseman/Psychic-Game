
var letters = ["a", "e", "i", "o", "u"];

var wins = 0;
var losses = 0;
var guessesLeft = 2;
var guessArray = [];
var userGuess;
var message = document.querySelector("#message");

// game start & welcome message
gameSetup();
message.innerHTML = "WELCOME<em>!!</em><br/>Tap Or Enter A Guess...";

// set & reset game
function gameSetup() {
    for (var k = 0; k < guessArray.length; k++) {
        document.getElementById(guessArray[k]).style.opacity = "1.0";
    }
    targetLetter();
    guessesLeft = 2;
    guessArray = [];
    document.querySelector("#wins").innerHTML = "Wins<hr/>" + wins;
    document.querySelector("#losses").innerHTML = "Losses<hr/>" + losses;
    document.querySelector("#guess-count").innerHTML = "You Have<br/>" + guessesLeft + " Guesses Left";
    document.querySelector("#used").innerHTML = "<strong>Waiting For<br/>Your Guess</strong>";
};

// pick a random letter from the letters array
function targetLetter() {
    computerPick = letters[Math.floor(Math.random() * letters.length)];
    return computerPick;
};

// add user guess to guess array
function addToGuessArray() {
    guessArray.push(userGuess);
    document.querySelector("#used").innerHTML = "You've Guessed:<br/>" + guessArray;
};

// inform if the letter picked isn't a vowel
function notVowel() {
    message.innerHTML = "'" + userGuess + "'" + " is not a vowel.<br/>Guess again.";
    return;
};

// increment wins, show message & reset game
function win() {
    wins++;
    message.innerHTML = "Win <em>!!</em><br/>(but you're not psychic).";
    gameSetup();
};

// decrement guessesLeft count, update onscreen counter, show message & reset game
function wrongGuess() {
    guessesLeft--;
    document.querySelector("#guess-count").innerHTML = "You Have<br/>" + guessesLeft + " Guess Left";
    message.innerHTML = "'" + userGuess + "'" + " is incorrect.<br/>Guess again.";
    addToGuessArray();
    return;
};

// increment losses, show message & reset game
function loss() {
    losses++;
    message.innerHTML = "It was <strong>'" + computerPick + "'</strong>.<br/>Game Restarted.";
    gameSetup();
};

// check if userGuess is in letters array, then check against guessesLeft & computerPick
function matchLogic() {
    var inArray = letters.includes(userGuess);
    if (inArray === false) {
        notVowel();
    } else if (guessesLeft > 0 && userGuess === computerPick) {
        win();
    } else if (guessesLeft > 1 && userGuess !== computerPick) {
        document.getElementById(userGuess).style.opacity = "0.25";
        wrongGuess();
    } else if (guessesLeft === 1 && userGuess !== computerPick) {
        loss();
    }
};

// grab the keyboard key pressed and convert it to lower case
document.onkeyup = function (keyPress) {
    userGuess = keyPress.key.toLowerCase();
    matchLogic();
};

// adds listener to each letter's li element
var listItems = document.getElementById("buttons").querySelectorAll("li");
var i;
for (i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener("click", checkPressed);
};

// grab the id of the li element clicked and check against guessesLeft & computerPick
function checkPressed() {
    userGuess = this.id;
    var j;
    for (var j = 0; j < listItems.length; j++) {
        if (userGuess === computerPick) {
            win();
            return;
        } else if (guessesLeft > 1 && userGuess !== computerPick) {
            document.getElementById(userGuess).style.opacity = "0.25";
            wrongGuess();
            return;
        } else if (guessesLeft === 1 && userGuess !== computerPick) {
            loss();
            return;
        }
    }
};

