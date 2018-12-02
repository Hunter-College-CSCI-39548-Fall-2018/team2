import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.home = this.home.bind(this);
    }

    logout() {
        const {history} = this.props;
        fetch('/logout')
            .then(history.push('/login'));
    }

    home() {
        const {history} = this.props;
        fetch('/')
            .then(history.push('/'));
    }

    render() {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">

                        <span className="mdl-layout-title">Bloom</span>

                        <div className="mdl-layout-spacer"/>

                        <nav className="mdl-navigation mdl-layout--large-screen-only">
                            <p className="mdl-navigation__link" onClick={this.home}>Home</p>
                            <p className="mdl-navigation__link" onClick={this.logout}>Logout</p>
                        </nav>
                    </div>
                </header>
                <main className="mdl-layout__content">
                    <div className="page-content"/>
                </main>
            </div>
        );
    }
}

export default withRouter(NavBar);
