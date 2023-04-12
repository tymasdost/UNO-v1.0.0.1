import React from 'react';
import './PlayedCards.css'
import Card from '../Card/Card';
import getCardValue from '../logic/readCards';
import { useState, useEffect } from 'react';

const PlayedCards = (props) => {
  const [rotation, setRotate] = useState([]);
  let {playedDeck, skin} = props;
  let itemList=[];
  
  useEffect(() => {
    setRotate(Array.apply(null, Array(112)).map(function () { return Math.random()*60-30; }))
  }, []);

  playedDeck.forEach((card,i)=>{
    let value = getCardValue(card);
    itemList.push(<Card key={Math.random()} value={[`${skin}/${value}`,rotation[i]]}  />)
  });

  

  return (
    <>
    <div id="cardDeck">
        {itemList}
    </div>
    </>
  );
};

export default PlayedCards;
