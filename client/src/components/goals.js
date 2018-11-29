import React, {Component} from 'react';
import Header from './header';
import GoalModal from './createGoal';
import GoalCard from './goalCard';
import NavBar from './navbar';

class Goals extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            cards: [{title: 'Test card 1', description: 'testing description', img: '', starred: true},
                {title: 'Test card 2', description: 'testing description', img: '', starred: false},
                {title: 'Test card 3', description: 'testing description', img: '', starred: true},
                {title: 'Test card 4', description: 'testing description', img: '', starred: false},
                {title: 'Test card 5', description: 'testing description', img: '', starred: true}],
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
        const numGoals = props.length;
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
                <GoalModal/>
                {this.displayGoals(this.state.cards)}
            </div>
        );
    }
}

export default Goals;