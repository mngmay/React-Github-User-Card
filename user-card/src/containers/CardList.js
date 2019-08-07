import React from "react";
import UserCard from "../components/Card";

const CardList = props => {
  const { followers } = props;

  return (
    <div className="card-list">
      {followers.map(follower => (
        <UserCard key={follower.id} follower={follower} />
      ))}
    </div>
  );
};

export default CardList;
