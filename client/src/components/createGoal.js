import React, {Component} from 'react';
import {post} from 'axios';
import '../css/goals.css';

class GoalModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            imageValue: '',
        };

        this.fileInput = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    // Handles submission of form data and posts it to backend
    handleSubmit = async e => {
        e.preventDefault();

        const url = '/create';
        const formData = new FormData();

        formData.append('img', this.state.imageValue);
        formData.append('goalTitle', this.state.title);
        formData.append('goalDescription', this.state.description);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        post(url, formData, config).then(() =>{
            window.location.reload();
        }).catch(err =>{
            console.log(err);
        });
    };

    // Updates the state of component with data entered into form
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    // Responsible for getting file for file uploading
    uploadFile(event) {
        let file = event.target.files[0];
        this.setState({imageValue: file});

        if (file) {
            let data = new FormData();
            data.append('file', file);
        }
    }

    render() {
        return (
            <div>
                {/** Floating action button **/}
                <div className='fab' data-toggle="modal" data-target="#addGoalModal">
                    <i id='add-button' className='material-icons'> add </i>
                </div>

                {/** Add goal modal **/}
                <div className="modal fade" id="addGoalModal" tabIndex="-1" role="dialog" aria-labelledby="addGoalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">

                            {/** Modal header **/}
                            <div className="modal-header">
                                <h5 className="modal-title">Add Goal</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            {/** Modal body **/}
                            <div className="add-goal modal-body">
                                <form onSubmit={this.handleSubmit} ref={el => this.form = el}>
                                    <div className="mdl-textfield mdl-js-textfield">
                                        <input className="mdl-textfield__input" name='title'
                                               onChange={this.handleInputChange} value={this.state.title} type="text"/>
                                        <label className="mdl-textfield__label">Goal Title</label>
                                    </div>
                                    <div className="mdl-textfield mdl-js-textfield">
                                        <input className="mdl-textfield__input" name='description'
                                               type="text" onChange={this.handleInputChange}/>
                                        <label className="mdl-textfield__label">Goal Description</label>
                                    </div>
                                    <div className="mdl-textfield mdl-js-textfield">
                                        <input className="mdl-textfield__input file-input" name='img'
                                               onChange={this.handleInputChange}
                                               placeholder={this.state.imageValue.name} type="text" id="uploadFile"
                                               readOnly/>
                                        <div
                                            className="mdl-button mdl-button--primary mdl-button--icon mdl-button--file">
                                            <i className="material-icons">
                                                cloud_upload
                                            </i>
                                            <input type="file" id="uploadBtn" onChange={this.uploadFile}/>
                                        </div>
                                        <label className="mdl-textfield__label">Goal Image Upload</label>
                                    </div>

                                    <div className="modal-footer">
                                        <input type="submit" value="submit" className='rkmd-btn-toggled'
                                               data-dismiss="modal" onClick={() => {
                                            this.form.dispatchEvent(new Event('submit'))
                                        }}/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );

    }
}

export default GoalModal;