import React, {Component} from 'react';
import {post} from 'axios';

class createUpdate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            imageValue: '',
            id: this.props.goalId
        };

        this.fileInput = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.postTitle,
            description: nextProps.postTitle,
            id: nextProps.id,
            imageValue: nextProps.postImage
        });
    }

    // Handles submission of form data and posts it to backend
    handleSubmit = async e => {
        const url = '/post/create';

        const formData = new FormData();
        formData.append('img', this.state.imageValue);
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('id', this.state.id);

        fetch(url, {
            method: 'POST',
            body: formData,
            enctype: "multipart/form-data",
        }).then(function (response) {
            window.location.reload();
        });
    };

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    uploadFile(event) {
        let file = event.target.files[0];
        alert('file' + file);
        this.setState({imageValue: file});

        if (file) {
            let data = new FormData();
            data.append('file', file);
        }
    }

    render() {
        return (
            <div id="createSubgoal" className="add-goal modal-body">
                <form onSubmit={this.handleSubmit} ref={el => this.form = el}>
                    <div className="mdl-textfield mdl-js-textfield">
                        <input className="mdl-textfield__input" name='title'
                               onChange={this.handleInputChange} value={this.state.title} type="text"/>
                        <label className="mdl-textfield__label">Update Title</label>
                    </div>
                    <div className="mdl-textfield mdl-js-textfield">
                        <input className="mdl-textfield__input" name='description'
                               type="text" onChange={this.handleInputChange}/>
                        <label className="mdl-textfield__label">Update Description</label>
                    </div>
                    <div className="mdl-textfield mdl-js-textfield">
                        <input className="mdl-textfield__input file-input" name='img'
                               onChange={this.handleInputChange}
                               placeholder={this.state.imageValue.name} type="text" id="uploadFile" readOnly/>
                        <div
                            className="mdl-button mdl-button--primary mdl-button--icon mdl-button--file">
                            <i className="material-icons">
                                cloud_upload
                            </i>
                            <input type="file" id="uploadBtn" onChange={this.uploadFile}/>
                        </div>
                        <label className="mdl-textfield__label">Update Image Upload</label>
                    </div>
                    <div className="modal-footer">
                    <input type="submit" value="submit" className='rkmd-btn-toggled'
                           data-dismiss="modal" onClick={() => {
                        this.form.dispatchEvent(new Event('submit'))
                    }} />
                </div>
                </form>
            </div>
        );
    }
}

export default createUpdate;