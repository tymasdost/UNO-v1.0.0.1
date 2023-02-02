const shuffle = (card) => {
    let j, x, i;
    for (i = card.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = card[i];
      card[i] = card[j];
      card[j] = x;
    }
    return card
  }

  export default shuffle