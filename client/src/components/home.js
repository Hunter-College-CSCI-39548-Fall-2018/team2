import React, {Component} from 'react';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({user: res.username}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/home');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    render() {
        return (
            <p> Hello World! {this.state.user} This page will eventually be the home page but it is currently <br/>
                under construction. Thanks for the patience! </p>
        );
    }
}

export default Home;