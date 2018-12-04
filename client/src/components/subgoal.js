import React, {Component} from 'react';

class Subgoal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };

        this.toggleCheckBox = this.toggleCheckBox.bind(this);

    }

    // Toggles the checkbox to mark a subgoal as completed

    toggleCheckBox() {
        const newState = !this.state.checked;
        this.setState({
            checked: newState
        });
    }


    render() {
        return (
            <section className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                <header
                    className="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white">

                </header>
                <div className="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone">
                    <div className="mdl-card__supporting-text">
                        <div className="parentContainer dropdownHeader">
                            <span><i id="dropdownIcon" className="material-icons">more_vert</i></span>
                            <span>
                                <select className=" dropdown mdl-textfield__input" name="dropDown">
                                    <option value="Delete">Delete</option>
                                    <option value="Complete">Share</option>
                                </select>
                            </span>
                        </div>
                        <div className="postHeader"><span id="subgoalTitle">This is a subgoal template</span><span
                            className="date">8/24/17</span>
                        </div>

                        <div className="parentContainer">
                        <span onClick={this.toggleCheckBox}>
                            {this.state.checked && <i id="checkBox" className="material-icons">check_box</i>}
                            {!this.state.checked && <i id="checkBox" className="material-icons">check_box_outline_blank</i>}
                        </span>
                            <span>
                        Here I'm going to talk about how close I'm getting towards my main goal! :) Ideally I can
                        also update, delete, or mark this as completed as well. This will be totally flexible and
                            whatever is programatically easier/ a better user experience.
                        </span></div>
                    </div>
                </div>
            </section>

        );
    }
}

export default Subgoal;