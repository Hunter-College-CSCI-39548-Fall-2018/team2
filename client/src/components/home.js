import React, {Component} from 'react';

class Home extends Component {

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
            <p> Hello World! This page will eventually be the home page but it is currently <br/>
            under construction. Thanks for the patience! </p>
        );
    }
}

export default Home;