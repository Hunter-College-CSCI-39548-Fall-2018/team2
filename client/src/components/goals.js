import React, {Component} from 'react';

class Goals extends Component {

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({response: res.express}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/goals');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    render() {
        return (
            <p> Hello World! This page will eventually be the goals page but it is currently <br/>
                under construction. Thanks for the patience! </p>
        );
    }
}

export default Goals;