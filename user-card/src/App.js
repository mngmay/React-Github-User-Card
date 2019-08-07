import React from "react";
import CardList from "./containers/CardList";
import "./App.css";

class App extends React.Component {
  state = {
    user: "mngmay",
    followers: [],
    search: ""
  };

  componentDidMount() {
    this.fetchFollowers();
  }

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

  handleUserChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ user: this.state.search });
    // console.log("Search state", this.state.search);
    // console.log("User state", this.state.user);
  };

  componentDidUpdate(props, prevstate) {
    // console.log("prev", prevstate.user, "this", this.state.user);
    if (prevstate.user !== this.state.user) {
      this.setState({ followers: [] });
      this.fetchFollowers();
    }
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.user}'s GitHub Followers</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleUserChange}
            name="search"
            placeholder="Select User"
          />
          <button>Submit</button>
        </form>
        <CardList followers={this.state.followers} />
      </div>
    );
  }
}

export default App;
