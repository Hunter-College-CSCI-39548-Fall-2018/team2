import React, { Component } from "react";
import "../css/home.css";
import backgroundImage from "../assets/homeplants.jpg";
import "../material-icon/css/material-design-iconic-font.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ user: res.username }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/home");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <div classname="bg">
        <div id="title">
          {" "}
          <h1>Welcome to Bloom</h1>
          <p>Set goals, track your progress, stay motivated!</p>
        </div>
        <div id="buttonContainer">
          <button id="button1">Login</button>
          <button id="button2">Learn</button>
        </div>
        <img alt="Bloom" src={backgroundImage} />
      </div>
    );
  }
}

export default Home;
