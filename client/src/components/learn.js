import React, { Component } from "react";
import "../css/learn.css";
import "../material-icon/css/material-design-iconic-font.css";
import loginVideo from "../assets/Login.mp4";
import createGoalVideo from "../assets/NewGoal.mp4";
import createSubGoalVideo from "../assets/Login.mp4";

class Learn extends Component {
  constructor(props) {
    super(props);
    this.home = this.register.bind(this);
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

  register = () => {
    const { history } = this.props;
    history.push("/register");
  };

  render() {
    return (
      <div className="learn__box-main">
        <h1 className="learn__header-main">Learn to Bloom</h1>
        <hr className="learn__header-divider" />
        <h2 className="learn__header-subsection">Create Your Account</h2>
        <video className="learn__video" loop autoPlay>
          <source src={loginVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <hr className="learn__header-divider" />
        <h2 className="learn__header-subsection">Create New Goal Categories</h2>
        <video className="learn__video" loop autoPlay>
          <source src={createGoalVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <hr className="learn__header-divider" />
        <h2 className="learn__header-subsection">
          Create Subgoals and Progress Updates
        </h2>
        <video className="learn__video" loop autoPlay>
          <source src={createSubGoalVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <hr className="learn__header-divider" />
        <p className="learn__footer">Ready to Bloom? </p>
        <p className="learn__footer" onClick={this.register}>
          Register Now
        </p>
      </div>
    );
  }
}

export default Learn;
