"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
let COLORS;

const colorButton = document.getElementById('colorGame');
const photoButton = document.getElementById('photoGame');
const matchBoard = document.getElementById('matchBoard');

photoButton.addEventListener('click', function(e) {
  e.preventDefault();

  if (matchCount === 8){
    let winner = document.getElementById('win');
    winner.remove();
}

  document.getElementById('game').innerHTML = '';
  score = 0;
  scoreBoard.innerHTML = score;
  matchCount = 0;
  counter = 0;

  COLORS = [
    "andy", "evan", "elias", "tim", "yusuke", "alfred", "joseph", "lawrence",
    "andy", "evan", "elias", "tim", "yusuke", "alfred", "joseph", "lawrence"
  ];

  const colors = shuffle(COLORS);

  createCards(colors);

  matchBoard.scrollIntoView();

})

colorButton.addEventListener('click',function(e) {
  e.preventDefault();

  if (matchCount === 8){
    let winner = document.getElementById('win');
    winner.remove();
}

  document.getElementById('game').innerHTML = '';
  score = 0;
  scoreBoard.innerHTML = score;
  matchCount = 0;
  counter = 0;

  COLORS = [
  "red", "blue", "green", "orange", "purple", "yellow", "grey", "pink",
  "red", "blue", "green", "orange", "purple", "yellow", "grey", "pink"
  ];

  const colors = shuffle(COLORS);

  createCards(colors);

  matchBoard.scrollIntoView();
})


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    let card = document.createElement('div');
    card.classList.add('back-card');
    card.dataset.label = color;

    gameBoard.append(card);
  }
}


const gameDad = document.getElementById('game');
let counter = 0;
let lastClass;
let lastEvent;
let matchCount = 0;


const scoreBoard = document.getElementById('score');
let score = 0;
scoreBoard.innerHTML = score;

const bestScore = document.getElementById('best')
let best = Infinity;


const messageBoard = document.getElementById('messages');
let match = document.getElementById('match');



gameDad.addEventListener('click', function(e){

  if (e.target.className === 'back-card' && counter === 0){
    flipCard(e);
    counter++;
    lastClass = e.target.dataset.label;
    lastEvent = e.target;

  }
  else if (e.target.className === 'back-card' && counter === 1){
    flipCard(e);
    counter++;
      if (lastClass === e.target.dataset.label){

        if(matchCount < 7) {match.classList.add('opaque');

          setTimeout(function () {
          match.classList.toggle('opaque');
        }, 750);

      }

        matchCount += 1;
        counter = 0;
        score += 1;
        scoreBoard.innerHTML = score;

          if (matchCount === 8){
          let win = document.createElement('div');
          win.setAttribute('id','win');
          win.innerText = 'You Win!!';
          setTimeout(function () {
              messageBoard.append(win)
            },200)
            if (score < best){
              best = score;
              bestScore.innerHTML = best;
            }
          }


      }
      else {
        setTimeout(function () {
          unFlipCard(e);
        }, 1500);

        score += 1;
        scoreBoard.innerHTML = score;
      }
  }

});

/** Flip a card face-up. */

function flipCard(card) {
  card.target.classList.toggle('back-card');
  card.target.classList.toggle(card.target.dataset.label);
}


/** Flip a card face-down. */

function unFlipCard(card) {
  card.target.classList.toggle('back-card');
  card.target.classList.toggle(card.target.dataset.label);
  lastEvent.classList.toggle('back-card');
  lastEvent.classList.toggle(lastEvent.dataset.label);
  counter = 0;
}

