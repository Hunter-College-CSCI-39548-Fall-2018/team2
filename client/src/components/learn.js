import React, { Component } from "react";
//import "../css/home.css";
import "../material-icon/css/material-design-iconic-font.css";

class Learn extends Component {
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
      <div>
        <p>Learn about Bloom...eventually!</p>
      </div>
    );
  }
}

export default Learn;
