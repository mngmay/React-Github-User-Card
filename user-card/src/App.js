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
      .then(users => this.setState({ followers: users }))
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
    console.log(this.state);
    return (
      <div className="App">
        <input onChange={this.handleUserChange} placeholder="Select User" />
        <CardList followers={this.state.followers} />
      </div>
    );
  }
}

export default App;
