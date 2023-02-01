import React from 'react';
import './Player4.css'
import Card from '../Card/Card';

const PlayedCards = (props) => {
  let {playedDeck} = props;
  let itemList=[];

  playedDeck.forEach(()=>{
    itemList.push(<Card key={Math.random()} value={["card_back_alt",0,"player4"]}  />)
  });

  return (
    <>
    <div id="player4Cards">
        {itemList}
    </div>
    </>
  );
};

export default PlayedCards;
