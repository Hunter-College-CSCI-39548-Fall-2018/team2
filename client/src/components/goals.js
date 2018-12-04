import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Header from './goalsHeader';
import GoalModal from './createGoal';
import GoalCard from './goalCard';
import NavBar from './navbar';

class Goals extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            cards: [],
            filteredType: ''
        };
        this.displayGoals = this.displayGoals.bind(this);
        this.updateGoals = this.updateGoals.bind(this);
        this.displayHeader = this.displayHeader.bind(this);
        this.addGoal = this.addGoal.bind(this);
    }

    componentDidMount() {
        this.callApi()
            .then(res => {
                if (!res.user) {
                    const {history} = this.props;
                    history.push('/login');
                } else {
                    this.setState(
                        {user: res.user.username,
                        cards: res.goals,
                        filteredType: res.filter});
                }
            }).catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/goals');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };
    this.displayGoals = this.displayGoals.bind(this);
    this.updateGoals = this.updateGoals.bind(this);
  }

  componentDidMount() {
    this.callApi()
      .then(res => {
        if (!res.user) {
          const { history } = this.props;
          history.push("/login");
        } else {
            return (
                <ul className='goal-cards'> {
                    this.state.cards.map((goal, index) => {
                        return (<GoalCard key={index} id={goal._id} goalTitle={goal.title}
                                          goalDescription={goal.description} goalImage={goal.img}
                                          starred={goal.starred}/>);
                    })}
                </ul>
            )
        }
      })
      .catch(err => console.log(err));
  }

    displayHeader(props){
        return(
            <Header filterImage={props} updateGoals={this.updateGoals}/>
        )
    }

    updateGoals(goals) {
        this.setState({
            cards: goals
            }
        );
    }

    addGoal(goal){
        let copy = Array.from(this.state.cards);
        copy.push(goal);
        this.setState({
            cards: copy
        });
    }

    render() {
        return (
            <div>
                <NavBar/>
                <Header filter={this.state.filteredType} updateGoals={this.updateGoals}/>
                {this.displayGoals(this.state.cards)}
                <GoalModal addGoal={this.addGoal}/>
            </div>
        );
    }
  }

  updateGoals(goals) {
    this.setState({
      cards: goals
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <Header
          filter={this.state.filteredType}
          updateGoals={this.updateGoals}
        />
        <p>{this.state.user}</p>
        {this.displayGoals(this.state.cards)}
        <GoalModal />
      </div>
    );
  }
}

export default withRouter(Goals);
