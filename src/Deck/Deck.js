import React from 'react';
import './Deck.css'
import Card from '../Card/Card';


const Deck = (props) => {
  let {playedDeck} = props;
  let itemList=[];
  playedDeck.forEach(()=>{
    itemList.push(<Card key={Math.random()} value={["card_back_alt"]}  />)
  });


  return (
    <>
    <div id="deck">
        {itemList}
    </div>
    </>
  );
};

export default Deck;
