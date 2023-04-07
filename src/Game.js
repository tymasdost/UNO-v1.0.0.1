import React, { useState } from 'react';
import './App.css';
import PlayedCards from './playedCards/PlayedCards';
import Deck from './Deck/Deck';
import Player2 from './Player2/Player2';
import Player3 from './Player3/Player3';
import Player4 from './Player4/Player4';
import Card from './Card/Card';
import shuffle from './logic/shuffle'
import getCardValue from './logic/readCards';

let card = document.createElement('img');
let round = 0;
let deck = shuffle(Array.apply(null, Array(112)).map(function (_, i) { return i; }));
let way = 1;
let PLAYING = false;
let TURN = 0;
const getCards = (num) => {
  let temp = [];
  for (let i = 0; i < num; i++) {
    if (round === 112) {
      round = 0
      deck = shuffle(deck)
    }
    temp.push(deck[round]);
    round++
  }
  return temp;
}

function App(props) {
  const [playedDeck, setplayedDeck] = useState(getCards(1));
  const [playerCards, setplayerCards] = useState(getCards(props.myProp[0][0]));
  const [player1Cards, setplayer1Cards] = useState(getCards(props.myProp[0][0]));
  const [player2Cards, setplayer2Cards] = useState(getCards(props.myProp[0][0]));
  const [player3Cards, setplayer3Cards] = useState(getCards(props.myProp[0][0]));
  let itemList = [];
  let played = getCardValue(playedDeck[playedDeck.length - 1]);
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const checkSpecialCard = (card) => {
    switch (card % 14) {
      case 11: way *= -1;
        break;
      default:
    }
  }

  const takeCard = async () => {
    if (document.getElementsByClassName('highlight').length === 0 && TURN % 4 === 0 && !PLAYING) {
      console.log("YOU TAKE CARD!!")
      PLAYING = true
      let card = getCards(1);
      await animateCard("get", getCardValue(card));
      setplayerCards([...playerCards.slice(0, playerCards.length / 2), card, ...playerCards.slice(playerCards.length / 2, playerCards.length)]);
      PLAYING = false
    }
  }

  const playCard = async (index, card) => {

    if (TURN % 4 === 0 && !PLAYING) {
      console.log("YOU PLAYED CARD!!")
      PLAYING = true
      setplayerCards([...playerCards.slice(0, index), ...playerCards.slice(index + 1, playerCards.length)])
      await animateCard("play", getCardValue(card));
      setplayedDeck([...playedDeck, card]);
      checkSpecialCard(card);
      TURN += way
      PLAYING = false
    }
  }

  playerCards.forEach((card, index) => {
    let value = getCardValue(card);
    let clas = 'card '
    let click;
    if ((value.split('_')[0] === played.split('_')[0] || value.split('_')[1] === played.split('_')[1] || value.split('_')[0] === "Wild" || played.split('_')[0] === "Wild") && TURN % 4 === 0) {
      clas += "highlight";
      click = () => playCard(index, card);
    }
    itemList.push(
      <div key={Math.random()} className={clas} onClick={click}>
        <Card key={Math.random()} value={[`${props.myProp[0][2]}/${value}`]} alt="44" />
      </div>
    )
  })

  const animateCard = async (play, img) => {
    card.setAttribute("src", `/${props.myProp[0][2]}/${img}.png`);
    card.setAttribute("id", `${play}` + TURN % 4);
    document.getElementById('container').appendChild(card);
    await delay(950);
    card.remove();
  }

  const playAi = async (deckAi, deckAiDefine) => {
    let temp = -1;
    if (!PLAYING) {
      PLAYING = true;
      await delay(props.myProp[0][1])
      for (let i = 0; i < deckAi.length; i++) {
        const value = getCardValue(deckAi[i]);
        if (value.split('_')[0] === played.split('_')[0] || value.split('_')[1] === played.split('_')[1] || value.split('_')[0] === "Wild" || played.split('_')[0] === "Wild") {
          temp = i;
          break;
        }
      }
      if (temp === -1) {
        await animateCard("get", "Back");
        deckAiDefine([...deckAi, ...getCards(1)]);
        console.log(`PLAYER: ${TURN % 4 + 1} | DRAWED: ${getCardValue(deckAi[deckAi.length - 1])}`)
      } else {
        const card = deckAi[temp];
        deckAiDefine([...deckAi.slice(0, temp), ...deckAi.slice(temp + 1, deckAi.length)])

        console.log(`PLAYER: ${TURN % 4 + 1} | PLAYED: ${getCardValue(card)}`)

        await animateCard("play", getCardValue(card));
        setplayedDeck([...playedDeck, card]);
        checkSpecialCard(card);
        TURN += way
      }
      PLAYING = false;
      console.log("PLAYER STOP PLAYING")
    }
  }


  if (TURN % 4 !== 0 && !PLAYING) {
    switch (TURN % 4) {
      case 1:
      case -1:
        playAi(player1Cards, setplayer1Cards)
        break;
      case 2:
      case -2:
        playAi(player2Cards, setplayer2Cards)
        break;
      case 3:
      case -3:
        playAi(player3Cards, setplayer3Cards)
        break;
      default:
    }
    console.log(`PLAYER TURN -> ${TURN % 4 + 1}`)
  }



  return (
    <>
      <PlayedCards skin={props.myProp[0][2]} playedDeck={playedDeck} />
      <Deck skin={props.myProp[0][2]} />
      <div id="getCardTrigger" onClick={async () => await takeCard()}></div>
      <div id="myHand">
        {itemList}
      </div>
      <Player2 playedDeck={player1Cards} skin={props.myProp[0][2]}/>
      <Player3 playedDeck={player2Cards} skin={props.myProp[0][2]}/>
      <Player4 playedDeck={player3Cards} skin={props.myProp[0][2]}/>
      <div id="container"></div>
    </>
  );
}

export default App;
