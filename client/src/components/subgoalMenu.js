import React, {Component} from 'react';

class SubgoalMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedButton: ''
        };

        this.switchSubgoals = this.switchSubgoals.bind(this);
        this.switchPost = this.switchPost.bind(this);
    }

    switchSubgoals(){
        this.setState({
            selectedButton: 'subgoal'
        });

        this.props.switchForm('createSubgoal');
    }

    switchPost(){
        this.setState({
            selectedButton : 'post'
        });

        this.props.switchForm('createUpdate');
    }

    render() {
        return (

            <span>
                <p id="subgoalDescription">1. Select 'Add Subgoal' to add a subgoal that you would like to accomplish. <br/>
                    2. Select 'Add Post' to create a new post to track your progress </p>
                <button id="navigate" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                        onClick={this.switchSubgoals}> Add Subgoal </button>
                <button id="navigate" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                        onClick={this.switchPost}> Add Post </button></span>
        );
    }
}

export default SubgoalMenu;