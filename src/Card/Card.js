import React from 'react';
import './Card.css'

const Card = (props) => {
  let { value } = props;
  let cardType = value[0];
  let deg = value[1];
  let classList = value[2];
  const imageUrl = `/${cardType}.png`;

  const style = {
    transform: `rotate(${deg}deg)`,
  };
  return (
      <img className={classList} src={process.env.PUBLIC_URL + imageUrl} style={style} alt={`${cardType}.png card`} />
  );
};

export default Card;
