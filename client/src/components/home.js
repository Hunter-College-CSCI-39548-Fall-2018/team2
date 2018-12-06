import NavBar from './navbar';
import React, {Component} from "react";
import "../css/home.css";
import "../material-icon/css/material-design-iconic-font.css";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            redirect: false
        };
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({user: res.username}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch("/home");
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    learnButtonClick = () => {
        const {history} = this.props;
        history.push("/learn");
    };

    loginButtonClick = () => {
        const {history} = this.props;
        history.push("/login");
    };

    render() {
        return (
            <div>
                <NavBar loggedIn={false}/>
                <div className="home__bg">
                    <div className="home__bg-image">
                        <div className="home__box">
                            <header className="home__header">
                                {" "}
                                <h1 className="home__header-title">Welcome to Bloom</h1>
                                <p className="home__header-subtitle">
                                    Set goals, track your progress, stay motivated!
                                </p>
                            </header>
                            <div className="home__button-container">
                                <button onClick={this.loginButtonClick} className="home__button">
                                    Login
                                </button>
                                <button onClick={this.learnButtonClick} className="home__button">
                                    Learn
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
