import React from "react";
import CardList from "./containers/CardList";
import "./App.css";

class App extends React.Component {
  state = {
    user: "mngmay",
    followers: []
  };

  fetchFollowers = () => {
    fetch(`https://api.github.com/users/${this.state.user}/followers`)
      .then(res => res.json())
      .then(users => {
        users.forEach(user =>
          fetch(user.url)
            .then(user => user.json())
            .then(user =>
              this.setState({ followers: [...this.state.followers, user] })
            )
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.fetchFollowers();
  }

  handleUserChange = e => {
    this.setState({ user: e.target.value });
  };

  render() {
    return (
      <div className="App">
        <input onChange={this.handleUserChange} placeholder="Select User" />
        <CardList followers={this.state.followers} />
      </div>
    );
  }
}

export default App;
