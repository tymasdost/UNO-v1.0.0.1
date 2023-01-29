import React from 'react';
import './Player3.css'
import Card from '../Card/Card';

const PlayedCards = (props) => {
  let {playedDeck} = props;
  let itemList=[];

  playedDeck.forEach(()=>{
    itemList.push(<Card key={Math.random()} value={["card_back_alt"]}  />)
  });

  return (
    <>
    <div id="player3Cards">
        {itemList}
    </div>
    </>
  );
};

export default PlayedCards;
