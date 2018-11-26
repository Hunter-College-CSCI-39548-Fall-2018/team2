import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../css/login-registration.css';

class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            rePassword: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectToLogin = this.redirectToLogin.bind(this);
    }

    // Handles submission of form data and posts it to backend
    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/home', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: this.state.username,
                password: this.state.password}),
        });
        const body = await response.text();
        this.setState({ responseToPost: body });
    };

    // Updates the state of component with data entered into form
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    // Redirects to login page
    redirectToLogin() {
        this.props.history.push("/home");
    };

    render() {
        return (
            <div className="body">
                <p>{this.state.response}</p>
                <form className="register-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label><i className="zmdi zmdi-account material-icons-name"/></label>
                        <input type="text" name="username" id="username" placeholder="Username"
                        value={this.state.username} onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label><i className="zmdi zmdi-lock"/></label>
                        <input type="password" name="password" id="password"
                               placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label><i className="zmdi zmdi-lock-outline"/></label>
                        <input type="password" name="rePassword" id="re_password"
                               placeholder="Re-enter your password" value={this.state.rePassword} onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group form-button">
                        <input type="submit" name="signup" id="signup" className="form-submit"
                               value="Register"/>
                        <Link to="/login" className="signup-image-link">Have an account? Login </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default RegistrationForm;