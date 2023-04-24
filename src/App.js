import {React,useState} from 'react';
import Game from './Game';
import Menu from './Menu/Main.js';

const App = () => {
    const [play, setPlay] = useState(false);
    const [cards, setCards] = useState(5);
    const [speed, setSpeed] = useState(350);
    const [skin, setSkin] = useState("Crypto_Cards");

  const startPlay = (value) => {
    setPlay(value);
  }
  const startCards = (value) => {
    setCards(value);
  }
  const gameSpeed = (value) => {
    setSpeed(value);
  }
  const cardSkin = (value) => {
    setSkin(value);
  }
  return (
    <>
        {(!play ? <Menu myProp={[play, cards, speed,skin]} startPlay={startPlay} startCards={startCards} gameSpeed={gameSpeed} setSkin={cardSkin}/> : null )}
        {(play ? <Game myProp={[[cards,speed,skin]]}/> : null )}
    </>
  );
};

export default App;
