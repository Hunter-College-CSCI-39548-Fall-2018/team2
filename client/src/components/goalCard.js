import React, {Component} from 'react';
import '../css/goals.css';

class GoalCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            goalTitle: this.props.goalTitle,
            goalDescription: this.props.goalDescription,
            goalImage: this.props.img,
            starred: this.props.starred
        };

        this.toggleStar = this.toggleStar.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.star = this.star.bind(this);
    }

    handleEditClick() {

    }

    star(props) {
        if (this.props.starred) {
            return (<i className="material-icons">star</i> );
        } else {
            return (<i className="material-icons">star_border</i>);
        }
    }

    toggleStar() {
        this.setState({
            starred: !this.state.starred
        });
    }

    render() {
        return (
            <div className="mdl-card mdl-shadow--2dp demo-card-square">
                <div className="mdl-card__title mdl-card__accent mdl-card--expand">
                    <img src={require('./cactus.jpg')} alt="goal"/>
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
                    <button className="mdl-button mdl-js-button mdl-button--icon"
                            onClick={this.toggleStar}>
                        {this.state.starred && <i className="material-icons">star</i>}
                        {!this.state.starred && <i className="material-icons">star_border</i>}
                    </button>
                </div>
            </div>
        );
    }
}

export default GoalCard;