import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom'
import '../css/login-register.css';

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
    }

    // Handles submission of form data and posts it to backend
    handleSubmit = async e => {
        e.preventDefault();

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
        });
        const {history} = this.props;
        history.push('/login');
    };

    // Updates the state of component with data entered into form
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    render() {
        return (
            <form className="register-form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label><i className="zmdi zmdi-account material-icons-name"/></label>
                    <input type="text" name="username" placeholder="Username"
                           value={this.state.username} onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                    <label><i className="zmdi zmdi-lock"/></label>
                    <input type="password" name="password"
                           placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                    <label><i className="zmdi zmdi-lock-outline"/></label>
                    <input type="password" name="rePassword"
                           placeholder="Re-enter your password" value={this.state.rePassword}
                           onChange={this.handleInputChange}/>
                </div>
                <div className="form-group form-button">
                    <input type="submit" name="signup" className="form-submit" value="Register"/>
                    <Link to="/login" className="signup-image-link">Have an account? Login </Link>
                </div>
            </form>
        );
    }
}

export default withRouter(RegistrationForm);