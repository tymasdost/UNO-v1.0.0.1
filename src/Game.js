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
import EndScreen from './endScreen/EndScreen'
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
  const [win, setwin] = useState(false);
  const [winner, setwinner] = useState();
  const [effect, seteffect] = useState("NONE");
  const [takeCount, setTakeCount] = useState(0);

  let itemList = [];
  let played = getCardValue(playedDeck[playedDeck.length - 1]);
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const checkSpecialCard = (card) => {
    switch (card % 14) {
      case 11: way *= -1;
        break;
      case 10: seteffect("block")
        break;
      case 12:
        seteffect("take2")
        setTakeCount(takeCount + 2);
        break;
      case 13:
        if (card / 14 > 4) {
          seteffect("take4")
          setTakeCount(takeCount + 4);
        }
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
  const checkPlayerCards = async () => {
    if (TURN % 4 === 0 && !PLAYING && effect !== "NONE" && document.getElementsByClassName('highlight').length === 0) {
      switch (effect) {
        case "block":
          TURN += way
          PLAYING = false
          break;
        case "take4":
        case "take2":
          await animateCard("get", "Back");
          setplayerCards([...playerCards, ...getCards(takeCount)]);
          setTakeCount(0)
          break;
        default:

      }
      seteffect("NONE")
      (TURN % 4 === 0 ? TURN += way : null)
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
      if (playerCards.length === 1) {
        setwinner(TURN % 4)
        setwin(true)
      }
      TURN += way
      PLAYING = false
    }
  }

  playerCards.forEach((card, index) => {
    let value = getCardValue(card);
    let clas = 'card '
    let click;
    switch (effect) {
      case "block":
        if (value.split('_')[1] === played.split('_')[1] && TURN % 4 === 0) {
          clas += "highlight";
          click = () => playCard(index, card);
        }
        break;
      case "take4":
      case "take2":
        if ((value.split('_')[1] === "Take2" || value.split('_')[1] === "Pick4") && TURN % 4 === 0) {
          clas += "highlight";
          click = () => playCard(index, card);
        }
        break;
      default:
        if ((value.split('_')[0] === played.split('_')[0] || value.split('_')[1] === played.split('_')[1] || value.split('_')[0] === "Wild" || played.split('_')[0] === "Wild") && TURN % 4 === 0) {
          clas += "highlight";
          click = () => playCard(index, card);
        }
    }

    itemList.push(
      <div key={Math.random()} className={clas} onClick={click}>
        <Card key={Math.random()} value={[`${props.myProp[0][2]}/${value}`]} alt="44" />
      </div>
    )
  })

  const animateCard = async (play, img) => {
    card.setAttribute("src", `/${props.myProp[0][2]}/${img}.png`);
    card.setAttribute("id", `${play}` + (TURN < 0 ? (TURN % 4) * -1 : TURN % 4));
    document.getElementById('container').appendChild(card);
    await delay(950);
    card.remove();
  }

  const playAi = async (deckAi, deckAiDefine) => {
    if (!PLAYING) {
      let temp = -1;
      let canPlay = true;
      PLAYING = true;
      await delay(props.myProp[0][1])
      if (effect !== "NONE") {
        switch (effect) {
          case "block":
            for (let i = 0; i < deckAi.length; i++) {
              const value = getCardValue(deckAi[i]);
              if (value.split('_')[1] === played.split('_')[1]) {
                temp = i;
                break;
              }
            }
            if (temp === -1) {
              TURN += way
              canPlay = false;
              seteffect("NONE")
            }
            break;
          case "take4":
          case "take2":
            for (let i = 0; i < deckAi.length; i++) {
              const value = getCardValue(deckAi[i]);
              if (value.split('_')[1] === "Take2" || value.split('_')[1] === "Pick4") {
                temp = i;
                break;
              }
            }
            if (temp === -1) {
              await animateCard("get", "Back");
              deckAiDefine([...deckAi, ...getCards(takeCount)]);
              setTakeCount(0)
              TURN += way
              canPlay = false;
              seteffect("NONE")
            }
            break;
          default:
        }
      } else {

        for (let i = 0; i < deckAi.length; i++) {
          const value = getCardValue(deckAi[i]);
          if (value.split('_')[0] === played.split('_')[0] || value.split('_')[1] === played.split('_')[1] || value.split('_')[0] === "Wild" || played.split('_')[0] === "Wild") {
            temp = i;
            break;
          }
        }
      }

      if (canPlay) {
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
          if (deckAi.length === 1) {
            setwinner(TURN % 4)
            setwin(true)
          }
          TURN += way
        }
      }

      PLAYING = false;
      console.log("PLAYER STOP PLAYING")
    }
  }


  if (!PLAYING) {
    switch (TURN % 4) {
      case 0:
        checkPlayerCards();
        break;
      case 1:
      case -3:
        playAi(player1Cards, setplayer1Cards)
        break;
      case 2:
      case -2:
        playAi(player2Cards, setplayer2Cards)
        break;
      case 3:
      case -1:
        playAi(player3Cards, setplayer3Cards)
        break;
      default:
    }
    console.log(`PLAYER TURN -> ${(TURN < 0 ? (TURN % 4) * -1 : TURN % 4)}`)
  }



  return (
    <>
      {(win ? <EndScreen props={winner} /> : null)}
      <PlayedCards skin={props.myProp[0][2]} playedDeck={playedDeck} />
      <Deck skin={props.myProp[0][2]} />
      <div id="getCardTrigger" onClick={async () => await takeCard()}></div>
      <div id="myHand">
        {itemList}
      </div>
      <Player2 playedDeck={player1Cards} skin={props.myProp[0][2]} />
      <Player3 playedDeck={player2Cards} skin={props.myProp[0][2]} />
      <Player4 playedDeck={player3Cards} skin={props.myProp[0][2]} />
      <div id="container"></div>
    </>
  );
}

export default App;
