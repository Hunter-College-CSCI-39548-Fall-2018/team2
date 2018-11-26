import React, {Component} from 'react';
import Header from './header';
import GoalModal from './goalModal';
import '../css/index.css';
import '../css/goals.css';

class Goals extends Component {

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

    render() {
        return (
            <div>
                <Header/>
                <GoalModal/>
            </div>
        );
    }
}

export default Goals;