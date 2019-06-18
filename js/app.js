/*
 * Create a list that holds all of your cards
 */
// global declarations
var parent = document.getElementById("deck");
console.log(parent);
var childs = document.getElementsByClassName("card");
var childsList = [].slice.call(childs);
console.log(childsList);
var hours;
var min;
var sec;
let timestatus = 0;
var time = 0;
var timeArea = document.getElementById("time");
var moves = 0;
var moveSection = document.getElementById("moves")
var cardStore = [];
var starCount = 3;
var starSection = [...document.getElementsByClassName("fa-star")];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

// creating an array to store cards
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
window.onload = inceptGame();

function inceptGame() {
  var shuffleCards = shuffle(childsList);
  for (var i = 0; i < childsList.length; i++) {
    console.log(shuffleCards[i]);
    console.log(parent);
    parent.append(shuffleCards[i]);
  }
}
// for refreshing the Game
function reload() {
  document.location.reload();
}

// adding eventlistener
for (var i = 0; i < childsList.length; i++) {
  childsList[i].addEventListener("click", displayCard);
}

// displaying cards
function displayCard() {
  if (timestatus == 0) {
    startTimer();
    timestatus = timestatus + 1;
  }
  this.classList.add("card", "open", "show", "disable");
  cardStore.push(this);
  if (cardStore.length == 2) {
    moves = moves + 1;
    moveSection.innerHTML = moves;
    starRating();
    // cards are matched
    if (cardStore[0].children[0].classList.item(1) == cardStore[1].children[0].classList.item(1)) {
      console.log("matched");
      cardStore[0].classList.add("match", "disable");
      cardStore[1].classList.add("match", "disable");
      if (matchedCards.length == 16) {
        clearInterval(time);
        // popup menu
        swal.fire({
          title: "congratulations",
          html: 'you have earned <strong style="color:blue"; text-shadow:3px 3px 3px #fff">' + starCount + ' <i class="fa fa-star"> </i> </strong> <br>And You completed this game with the time of <br>' + hours + 'hours :' + min + 'minutes :' + sec + 'seconds',
          confirmButtonText: '<i clas ="fa fa-thumbs-up"></i> Restart',
        }).then(() => {
          document.location.reload();
        });
      }
      cardStore = [];
    }
// cards are unmatched
    else {
      console.log("unmatched");
      cardStore[0].classList.add("notmatch");
      cardStore[1].classList.add("notmatch");
      cardStore.map((card) => {
        setTimeout(() => {
          card.classList.remove("notmatch", "open", "show", "disable");
        }, 200);
      })

      cardStore = [];
    }
  }
}
var matchedCards = document.getElementsByClassName("match");
//time functionality
function startTimer() {
  sec = 0;
  min = 0;
  hours = 0
  time = setInterval(() => {
    sec = sec + 1;
    if (sec == 59) {
      sec = 0;
      min = min + 1;
    }
    if (min == 60) {
      min = 0;
      hours = hours + 1;
    }
    timeArea.innerHTML = hours + " :: " + min + " :: " + sec;
  }, 1000)
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function starRating() {
  if (moves > 13 && moves <= 17) {
    starCount = 2;
    starSection[2].style.display = "none";

  }
  if (moves > 17) {
    starCount = 1;
    starSection[1].style.display = "none";
  }
}
