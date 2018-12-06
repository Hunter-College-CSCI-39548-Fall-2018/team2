import React, { Component } from "react";

import { withRouter } from "react-router-dom";

import NavBar from "./navbar";

class Subgoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      subgoals: [],
      filteredType: "All"
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/subgoals");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}

export default Subgoals;
