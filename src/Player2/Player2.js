import React from 'react';
import './Player2.css'
import Card from '../Card/Card';

const PlayedCards = (props) => {
  let {playedDeck} = props;
  let itemList=[];

  playedDeck.forEach(()=>{
    itemList.push(<Card key={Math.random()} value={["card_back_alt"]}  />)
  });

  return (
    <>
    <div id="player2Cards">
        {itemList}
    </div>
    </>
  );
};

export default PlayedCards;
