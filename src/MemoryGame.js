
class MemoryGame {
  constructor() {
    this.suits = ['0001', '0002', '0003', '0004', '0005', '0006',
      '0007', '0008', '0001', '0002', '0003', '0004', '0005', '0006',
      '0007', '0008',]
    this.newSuits = this.mixSuits(this.suits);
    this.memory = document.getElementById('memory');
    this.winText = document.getElementById('winText');
    this.firstCard = null;
    this.secondCard = null;
    this.hasFlippedCard = false;
    this.lockBoard = false;
    this.countTries = 0;
    this.countPairs = 0;
  }

mixSuits(suits) {
  return suits.sort(() => { return .5 - Math.random() });
}
createCards() {
  this.newSuits.map((newSuits, i) => {
    let card = document.createElement('div');
    let img_front = document.createElement('img');
    let img_back = document.createElement('img');
    card.className = 'card';
    card.addEventListener('click', this.flipCard)
    card.id = (`${i}`);
    card.name = `${newSuits}`;
    memory.prepend(card);
    img_back.className = 'back';
    img_back.src = `https://raw.githubusercontent.com/Boardonly/project1/master/images/${newSuits}.jpg`;
    img_front.className = 'front';
    img_front.src = `https://raw.githubusercontent.com/Boardonly/project1/master/images/back.jpg`;
    card.prepend(img_back, img_front);
  })
}

flipCard() {

  if (this.lockBoard) return;
  if (this === this.firstCard) return;
  this.classList.add('flip');

  if (this.hasFlippedCard == false) {
    this.hasFlippedCard = true;
    this.firstCard = this;
    return;
  }
  this.secondCard = this;
  this.matchCard();
}

unflipCard() {
  this.lockBoard = true;
  setTimeout(() => {
    this.firstCard.classList.remove('flip');
    this.secondCard.classList.remove('flip');
    this.reset();
  }, 750);
}

matchCard() {
  this.countTries += 1;
  if (this.firstCard.name === this.secondCard.name) {
    this.disableCards()
  } else {
    this.unflipCard();
  }
}

disableCards() {
  this.firstCard.removeEventListener('click', this.flipCard);
  this.secondCard.removeEventListener('click', this.flipCard);
  this.countPairs += 1;
  this.win()
  this.reset();
}

reset() {
  this.hasFlippedCard = false;
  this.lockBoard = false;
  this.firstCard = null;
  this.secondCard = null;
}

win() {
  if (this.countPairs === 8) {
    this.winText.innerHTML = `Ура. Это Победа за ${this.countTries} ${this.ends(countTries)}!!!`;
  }
}
ends(countTries) {
  let count = countTries % 100;
  if (count >= 5 && count <= 20) {
    txt = 'ходов';
  } else {
    count = count % 10;
    if (count == 1) {
      txt = 'ход';
    } else if (count >= 2 && count <= 4) {
      txt = 'хода';
    }
  }
  return txt;
}
}
