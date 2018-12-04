import React, {Component} from 'react';

class createUpdate extends Component {

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

        const url = '/goal/create';
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

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

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
            <div id="createSubgoal"className="add-goal modal-body">
                <form>
                    <div className="mdl-textfield mdl-js-textfield">
                        <input className="mdl-textfield__input" name='title' type="text"/>
                        <label className="mdl-textfield__label">Update Title</label>
                    </div>
                    <div className="mdl-textfield mdl-js-textfield">
                        <input className="mdl-textfield__input" name='description'
                               type="text"/>
                        <label className="mdl-textfield__label">Update Description</label>
                    </div>
                    <div className="mdl-textfield mdl-js-textfield">
                        <input className="mdl-textfield__input file-input" name='img' type="text" id="uploadFile"
                               readOnly/>
                        <div
                            className="mdl-button mdl-button--primary mdl-button--icon mdl-button--file">
                            <i className="material-icons">
                                cloud_upload
                            </i>
                            <input type="file" id="uploadBtn"/>
                        </div>
                        <label className="mdl-textfield__label">Update Image Upload</label>
                    </div>                                    <div className="modal-footer">
                    <input type="submit" value="submit" className='rkmd-btn-toggled'
                           data-dismiss="modal" />
                </div>
                </form>
            </div>
        );
    }
}

export default createUpdate;