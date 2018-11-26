import React, {Component} from 'react';
import '../css/index.css';
import '../css/goals.css';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clickedButton: '',
            userName: ''
        };

    }

    render() {
        return (
            <div id="header">
                <h1 id="application-title"> Bloom </h1>
                <h2 id="application-description"> Welcome !</h2>

                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                    All
                </button>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                    Priority
                </button>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                    Completed
                </button>
            <hr/>
            </div>
        );
    }
}

export default Header;