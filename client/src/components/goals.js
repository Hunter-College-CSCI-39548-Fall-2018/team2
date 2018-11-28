import React, {Component} from 'react';
import Header from './header';
import GoalModal from './goalModal';
import GoalCard from "./goalCard";
import '../css/index.css';
import '../css/goals.css';

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
            .then(res => this.setState({response: res.express}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    displayGoals(props) {
        const numGoals = this.state.cards.length;
        if (numGoals === 0) {
            return(<p> You currently have no goals. Add one by clicking the '+' button! </p>);
        } else {
            return (
                <ul> {
                    this.state.cards.map((goal, index) => {
                        return (<GoalCard key={index} goalTitle={goal.title}
                                          goalDescription={goal.description} goalImage={goal.img}/>);
                    })}
                </ul>
            )
        }
    };

    render() {
        return (
            <div>
                <Header/>
                <GoalModal/>
                <test/>
                <div>
                    {this.displayGoals(this.state.cards)}
                </div>
            </div>
        );
    }
}

export default Goals;