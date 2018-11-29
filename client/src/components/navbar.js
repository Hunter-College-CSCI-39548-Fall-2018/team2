import React, {Component} from 'react';

class NavBar extends Component {

    render() {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">

                        <span className="mdl-layout-title">Bloom</span>

                        <div className="mdl-layout-spacer"/>

                        <nav className="mdl-navigation mdl-layout--large-screen-only">
                            <a className="mdl-navigation__link" href="https://www.google.com/">Home</a>
                            <a className="mdl-navigation__link" href="https://www.google.com/" onClick={this.logout}>Logout</a>
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

export default NavBar;
