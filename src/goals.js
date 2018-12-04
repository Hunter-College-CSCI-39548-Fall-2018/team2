import React from "react";
import Goal from "./Goal.js";

export default class Goals extends React.Component {
  state = {
    goals: ["s1", "s2", "s3"]
  };
  componentWillMount() {
    //fetch my data here - axios lib
    this.setState({
      goals: goals
      //goals will be db data
      //make sure css loads
    });
  }
  render() {
    return (
      <div>
        {this.state.goals.map(goal => {
          return <Goal key={goal} goal={goal} />;
        })}
      </div>
    );
  }
}
