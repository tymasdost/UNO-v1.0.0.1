import React from 'react';
import './Player4.css'
import Card from '../Card/Card';
import readCard from '../logic/readCards'

const Player4 = (props) => {
  let {playedDeck, skin} = props;
  let itemList=[];

  playedDeck.forEach((card)=>{
        //itemList.push(<Card key={Math.random()} value={[`${skin}/${readCard(card)}`,0,"player4"]}  />) // predek
        itemList.push(<Card key={Math.random()} value={[`${skin}/Back`,0,"player4"]}  />) // zadek
  });

  return (
    <>
    <div id="player4Cards">
        {itemList}
    </div>
    </>
  );
};

export default Player4;
