import React, {Component} from 'react';
import {Image} from 'cloudinary-react';
import '../css/goals.css';

class GoalCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            goalTitle: props.goalTitle,
            goalDescription: props.goalDescription,
            goalImage: props.goalImage,
            starred: props.starred
        };

        this.toggleStar = this.toggleStar.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.editGoal = this.editGoal.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    handleEditClick() {

    }

    toggleStar() {

        const newState = !this.state.starred;
        this.setState({
            starred: newState
        });

        fetch('/star', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                starred: newState,
                id: this.state.id
            }),
        }).then(res => {

        }).catch(err => console.log(err));
    }

    editGoal() {

    }

    uploadFile(event) {
        let file = event.target.files[0];
        this.setState({goalImage: file.name});

        if (file) {
            let data = new FormData();
            data.append('file', file);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.id,
            goalTitle: nextProps.goalTitle,
            goalDescription: nextProps.goalDescription,
            goalImage: nextProps.goalImage,
            starred: nextProps.starred
        });
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
                            <div className="add-goal modal-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="mdl-textfield mdl-js-textfield">
                                        <input className="mdl-textfield__input" type="text"
                                               value={this.state.title} onChange={this.handleInputChange}/>
                                        <label className="mdl-textfield__label">Goal Title</label>
                                    </div>
                                    <div className="mdl-textfield mdl-js-textfield">
                                        <input className="mdl-textfield__input" type="text"
                                               value={this.state.description} onChange={this.handleInputChange}/>
                                        <label className="mdl-textfield__label">Goal Description</label>
                                    </div>
                                    <div className="mdl-textfield mdl-js-textfield">
                                        <input className="mdl-textfield__input file-input"
                                               placeholder={this.state.goalImage} type="text" id="uploadFile"
                                               readOnly/>
                                        <div
                                            className="mdl-button mdl-button--primary mdl-button--icon mdl-button--file">
                                            <i className="material-icons">
                                                cloud_upload
                                            </i>
                                            <input type="file" id="uploadBtn" onChange={this.uploadFile}
                                                   ref={this.fileInput}/>
                                        </div>
                                        <label className="mdl-textfield__label">Goal Image Upload</label>
                                    </div>
                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                        <select className="mdl-textfield__input">
                                            <option/>
                                            <option value="Update Goal">Update Goal</option>
                                            <option value="Complete Goal">Complete Goal</option>
                                            <option value="Delete Goal">Delete Goal (Warning: Deletion is permanent)
                                            </option>
                                        </select>
                                        <label className="mdl-textfield__label">Select Action</label>
                                    </div>


                                    <div className="modal-footer">
                                        <div className="modal-footer">
                                            <input type="submit" value="Update" className='edit-btn'/>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

                {/** Goal Card **/}
                <div className="mdl-card mdl-shadow--2dp demo-card-square">
                    <div className="mdl-card__title mdl-card__accent mdl-card--expand">
                        <Image cloudName="bloom-goal-setting" publicId={this.state.goalImage}/>
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