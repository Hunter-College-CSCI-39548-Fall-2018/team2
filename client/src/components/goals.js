import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

import Header from './header';
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
                        cards: res.goals});
                }
            }).catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/goals');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    displayGoals(props) {
        const numGoals = props.length;
        //console.log("THIS IS AN IMAGE" + goal.img);
        if (numGoals === 0) {
            return (<p> You currently have no goals. Add one by clicking the '+' button! </p>);
        } else {
            return (
                <ul className='goal-cards'> {
                    props.map((goal, index) => {
                        return (<GoalCard key={index} goalTitle={goal.title}
                                          goalDescription={goal.description} goalImage={goal.img}
                                          starred={goal.starred}/>);
                    })}
                </ul>
            )
        }
    };


    render() {
        return (
            <div>
                <NavBar/>
                <Header/>
                <p>{this.state.user}</p>
                {this.displayGoals(this.state.cards)}
                <GoalModal/>
            </div>
        );
    }
}

export default withRouter(Goals);