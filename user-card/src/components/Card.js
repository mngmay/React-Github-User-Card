import React from "react";

const Card = props => {
  const { follower } = props;
  console.log(follower);
  return <div className="user-card">I'm a card</div>;
};

export default Card;
