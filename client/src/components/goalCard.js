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
        this.editGoal = this.editGoal.bind(this);
    }

    handleEditClick() {

    }

    toggleStar() {
        this.setState({
            starred: !this.state.starred
        });
    }

    editGoal() {

    }

    render() {
        return (
            <div>
                {/** Edit goal modal **/}
                <div className="modal fade" id="editGoalModal" tabIndex="-1" role="dialog"
                     aria-labelledby="addGoalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">

                            {/** Modal header **/}
                            <div className="modal-header">
                                <h5 className="modal-title">Update Goal</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            {/** Modal body **/}
                            <div id="add-goal" className="modal-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>Goal Title</label>
                                        <input type="text" className="form-control" name="goalTitle"
                                               value={this.state.title} onChange={this.handleInputChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Goal Description</label>
                                        <textarea className="form-control" name="goalDescription" rows="3"
                                                  value={this.state.description} onChange={this.handleInputChange}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="file" ref={this.fileInput} className="form-control-file"
                                               name="uploadPicture"/>
                                    </div>
                                    <div className="modal-footer">
                                        <input type="submit" value="Delete" className='remove-btn'/>
                                        <input type="submit" value="Edit" className='edit-btn'/>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

                {/** Goal Card **/}
                <div className="mdl-card mdl-shadow--2dp demo-card-square">
                    <div className="mdl-card__title mdl-card__accent mdl-card--expand">
                        <img src={require('../assets/default_Images/cactus.jpg')} alt="goal"/>
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
                            <i id="edit_goal" data-toggle="modal" data-target={'#editGoalModal'}
                               className="material-icons" onChange={this.handleEditClick}>
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
            </div>
    );
    }
    }

    export default GoalCard;