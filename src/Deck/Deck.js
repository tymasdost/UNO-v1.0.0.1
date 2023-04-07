import React from 'react';
import './Deck.css'
import Card from '../Card/Card';


const Deck = (props) => {
  let {skin} = props;



  return (
    <>
    <div id="deck">
      <Card key={Math.random()} value={[`${skin}/Back`]}/>
    </div>
    </>
  );
};

export default Deck;

