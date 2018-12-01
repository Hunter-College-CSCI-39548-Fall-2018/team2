import React, {Component} from 'react';
import '../css/login-register.css';
import RegistrationForm from './registrationForm'
import '../fonts/material-icon/css/material-design-iconic-font.css';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            response: '',
            post: '',
            responseToPost: '',
        };
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({response: res.express}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/register');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    render() {
        return (
            <div className="bg">
                <div className="main">
                    <section className="signup">
                        <div className="container">
                            <div className="signup-content">
                                <div className="signup-form">
                                    <h2 className="form-title">Bloom</h2>
                                    <p id="lr-application-description">Track your goals and reflect upon your
                                        journey</p>
                                    <RegistrationForm/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default Register;