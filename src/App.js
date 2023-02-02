import React, { useState } from 'react';
import './App.css';
import PlayedCards from './playedCards/PlayedCards';
import Deck from './Deck/Deck';
import Player2 from './Player2/Player2';
import Player3 from './Player3/Player3';
import Player4 from './Player4/Player4';
import shuffle from './logic/shuffle';
import Card from './Card/Card';
import getCardValue from './logic/readCards';
import { useCallback, useEffect } from 'react';

const balik = shuffle(Array.apply(null, Array(112)).map(function (_, i) { return i; }));
let card = document.createElement('img');

function App() {
  const [turn, setTurn] = useState(0);
  const [deck, setDeck] = useState([...balik, ...balik, ...balik, ...balik]);
  const [playedDeck, setplayedDeck] = useState([]);
  const [playerCards, setplayerCards] = useState([]);
  const [player1Cards, setplayer1Cards] = useState([]);
  const [player2Cards, setplayer2Cards] = useState([]);
  const [player3Cards, setplayer3Cards] = useState([]);
  let way = 1;

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const getCards = useCallback((num) => {
    let temp = [];
    for (let i = 0; i < num; i++) {
      temp.push(deck[0]);
      deck.shift()
    }
    return temp;
  }, [deck])

  useEffect(() => {
    setplayedDeck(getCards(1));
    setplayerCards([...getCards(5)]);
    setplayer1Cards([...getCards(5)]);
    setplayer2Cards([...getCards(5)]);
    setplayer3Cards([...getCards(5)]);
  }, [getCards]);
  let block = true;
  const takeCard = useCallback(async() => {
    
    if (document.getElementsByClassName('highlight').length === 0 && turn === 0 && block) {
      block = false;
      let card = getCards(1);
      await animateCard("get",getCardValue(card));
      setplayerCards([...playerCards.slice(0, playerCards.length / 2), card,...playerCards.slice(playerCards.length / 2, playerCards.length)]);
      
    }

  }, [playerCards, getCards, turn])

  let itemList = [];
  let played = getCardValue(playedDeck[playedDeck.length - 1]);


  const playCard = useCallback(async(index, card) => {
    if (turn === 0) {
      setplayerCards([...playerCards.slice(0, index), ...playerCards.slice(index + 1, playerCards.length)])
      await animateCard("play",getCardValue(card));
      setplayedDeck([...playedDeck, card])
      setTurn(1)
    }
  }, [playerCards, playedDeck, turn])



  playerCards.forEach((card, index) => {
    let value = getCardValue(card);
    let clas = 'card '
    let click;
    if ((value.split('_')[0] === played.split('_')[0] || value.split('_')[1] === played.split('_')[1] || value.split('_')[0] === "wild" || played.split('_')[0] === "wild") && turn === 0) {
      clas += "highlight";
      click = () => playCard(index, card);
    }
    itemList.push(
      <div key={Math.random()} className={clas} onClick={click}>
        <Card key={Math.random()} value={[value]} alt="44" />
      </div>
    )
  })


  const animateCard = useCallback(async(play,img) => {
    card.setAttribute("src", `/uno_assets_2d/PNGs/small/${img}.png`);
    card.setAttribute("id", `${play}` + turn);
    document.getElementById('container').appendChild(card);
    await delay(1000);
    card.remove();
}, [turn])

  const playAi = (async (deckAi, setter) => {
    let temp = -1;
    for (let i = 0; i < deckAi.length; i++) {
      const value = getCardValue(deckAi[i]);
      if (value.split('_')[0] === played.split('_')[0] || value.split('_')[1] === played.split('_')[1] || value.split('_')[0] === "wild" || played.split('_')[0] === "wild") {
        temp = i;
        break;
      }
    }

    if (temp === -1) {
      await animateCard("get","card_back_alt");
      await setter([...deckAi, getCards(1)])
      
    } else {
      await animateCard("play",getCardValue(deckAi[temp]));
      await setter([...deckAi.slice(0, temp), ...deckAi.slice(temp + 1, deckAi.length)]);
      setplayedDeck([...playedDeck, deckAi[temp]]);
      setTurn(turn + way)
    }
  });


  if (turn !== 0) {
    switch (turn) {
      case 1: playAi(player1Cards, setplayer1Cards);
        break;
      case 2: playAi(player2Cards, setplayer2Cards);
        break;
      case 3: playAi(player3Cards, setplayer3Cards);
        break;
      default:
        setplayedDeck([...playedDeck.slice(playedDeck.length/2)]);
        setTurn(0);
    }
  }




  return (
    <>
      <PlayedCards playedDeck={playedDeck} />
      <Deck playedDeck={deck} />
      <div id="getCardTrigger" onClick={async() => await takeCard()}></div>
      <div id="myHand">
        {itemList}
      </div>
      <Player2 playedDeck={player1Cards} />
      <Player3 playedDeck={player2Cards} />
      <Player4 playedDeck={player3Cards} />
      <div id="currentPlayer">Playing Player: {turn}</div>
      <div id="unoButton"></div>
      <div id="unoText">UNO</div>
      <div id="container"></div>
    </>
  );
}

export default App;
