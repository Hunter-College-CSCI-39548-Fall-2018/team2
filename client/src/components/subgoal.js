import React, {Component} from 'react';

class Subgoal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            checked: false,
            title: props.subgoalTitle,
            description: props.subgoalDescription,
            completed: props.completed,
            date: props.subgoalDate
        };

        this.toggleCheckBox = this.toggleCheckBox.bind(this);
    }

    // Used to initialize the component with the previous state
    componentWillReceiveProps(nextProps) {

        this.setState({
            id: nextProps.id,
            checked: false,
            title: nextProps.subgoalTitle,
            description: nextProps.subgoalDescription,
            completed: nextProps.completed,
            date: nextProps.subgoalDate
        });
    }

    // Toggles the checkbox to mark a subgoal as completed
    toggleCheckBox() {
        const newState = !this.state.checked;
        this.setState({
            completed: newState
        });

        fetch('/subgoal/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                checked: newState,
                id: this.state.id
            }),
        }).catch(err => console.log(err));
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
                        <div className="postHeader"><span id="subgoalTitle">{this.state.title}</span><span
                            className="date">{this.state.date}</span>
                        </div>

                        <div className="parentContainer">
                        <span onClick={this.toggleCheckBox}>
                            {this.state.completed && <i id="checkBox" className="material-icons">check_box</i>}
                            {!this.state.completed &&
                            <i id="checkBox" className="material-icons">check_box_outline_blank</i>}
                        </span>
                            <span>
                                {this.state.description}
                        </span></div>
                    </div>
                </div>
            </section>

        );
    }
}

export default Subgoal;