//MEMORY CARD PROJECT



// get all of the cards
const allCards = document.querySelectorAll(".card");
//we will establish these variables later
let cardFlipped = false;
let preventFlip = false;
let first;
let second;
//this is the function for when the user flips a card
function flipCard() {
  // if the board is locked, then don't do anything
  if (preventFlip) return;
  if (this === first) return;

  // add the flip class to the card
  this.classList.add("flip");

  // if there is no card flipped, then flip the card
  if (!cardFlipped) {
    cardFlipped = true;
    first = this;

    return;
  }

  second = this;
  checkMatch();
}

// check if the cards match with this function
function checkMatch() {
  let isMatch = first.dataset.framework === second.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}
//disable the cards so they cannot be selected
function disableCards() {
  first.removeEventListener("click", flipCard);
  second.removeEventListener("click", flipCard);

  reset();
}

// unflip the cards if they don't match
function unflipCards() {
  preventFlip = true;
//set timeout to set a specific time for this function to run
  setTimeout(() => {
    first.classList.remove("flip");
    second.classList.remove("flip");

    reset();
  }, 1500);
}

// reset the board
function reset() {
  [cardFlipped, preventFlip] = [false, false];
  [first, second] = [null, null];
}

// shuffle the cards
allCards.forEach(card => {
  let randomPosition = Math.floor(Math.random() * 10);
  card.style.order = randomPosition;
});

// make the cards clickable
allCards.forEach(card => card.addEventListener("click", flipCard));
