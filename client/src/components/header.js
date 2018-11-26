import React, {Component} from 'react';
import '../css/index.css';
import '../css/goals.css';


class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="header">
                <h1 id="application-title">
                    Bloom
                </h1>
                <h2 id="application-description">
                    Welcome!
                </h2>

                <div className="fab" data-toggle="modal" data-target="#addGoalModal">
                    <i id="add-button" className="material-icons"> add </i>
                </div>

                <div className="modal fade" id="addGoalModal" tabIndex="-1" role="dialog" aria-labelledby="addGoalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Goal</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

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