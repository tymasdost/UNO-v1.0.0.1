import React from 'react';
import './Player3.css'
import Card from '../Card/Card';
import readCard from '../logic/readCards'

const Player3 = (props) => {
  let {playedDeck, skin} = props;
  let itemList=[];

  playedDeck.forEach((card)=>{
        //itemList.push(<Card key={Math.random()} value={[`${skin}/${readCard(card)}`,0,"player3"]}  />) // predek
        itemList.push(<Card key={Math.random()} value={[`${skin}/Back`,0,"player3"]}  />) // zadek
  });

  return (
    <>
    <div id="player3Cards">
        {itemList}
    </div>
    </>
  );
};

export default Player3;
