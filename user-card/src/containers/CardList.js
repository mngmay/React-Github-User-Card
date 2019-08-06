import React from "react";
import Card from "../components/Card";

const CardList = props => {
  const { followers } = props;
  return followers.map(follower => (
    <Card key={follower.id} follower={follower} />
  ));
};

export default CardList;
