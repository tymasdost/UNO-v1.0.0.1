import React from 'react';
import './Player2.css'
import Card from '../Card/Card';
import readCard from '../logic/readCards'

const Player2 = (props) => {
  let {playedDeck, skin} = props;
  let itemList=[];

  playedDeck.forEach((card)=>{
    //itemList.push(<Card key={Math.random()} value={[`${skin}/${readCard(card)}`,0,"player2"]}  />) // predek
    itemList.push(<Card key={Math.random()} value={[`${skin}/Back`,0,"player2"]}  />) // zadek
  });

  return (
    <>
    <div id="player2Cards">
        {itemList}
    </div>
    </>
  );
};

export default Player2;
