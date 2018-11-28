import React, {Component} from 'react';
import '../css/index.css';
import '../css/goals.css';

class GoalCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            goalTitle: this.props.goalTitle,
            goalDescription: this.props.goalDescription,
            goalImage: this.props.goalImage,
            starred: true
        };

        this.handleStarredClick = this.handleStarredClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.star = this.star.bind(this);
    }

    handleStarredClick() {

    }

    handleEditClick() {

    }

    star(props) {
        const starred = props.starred;
        if (starred) {
            return (<img src={ require('../assets/icons/star_filled.svg') } alt="filled star" />);
        } else {
            return (<img src={ require('../assets/icons/star_empty.svg') } alt="empty star" />);
        }
    }

    render() {
        return (
            <div className="mdl-card mdl-shadow--2dp demo-card-square">
                <div className="mdl-card__title mdl-card__accent mdl-card--expand">
                    <img src={this.state.goalImage} alt="goal"/>
                </div>
                <div className="card-information">
                    <div className="mdl-card__card-title">
                        <span className="card-title">{this.state.goalTitle}</span>
                    </div>
                    <div className="mdl-card__supporting-text">
                        <span className="card-description">{this.state.goalDescription}</span>
                    </div>
                </div>
                <div className="mdl-card__actions mdl-card--border">
                    <button className="mdl-button mdl-js-button mdl-button--icon">
                        <i id="edit_goal" className="material-icons">
                            create
                        </i>
                    </button>
                    <button className="mdl-button mdl-js-button mdl-button--icon">
                        <star starred={this.state.starred}/>
                    </button>
                </div>
            </div>
        );
    }
}

export default GoalCard;