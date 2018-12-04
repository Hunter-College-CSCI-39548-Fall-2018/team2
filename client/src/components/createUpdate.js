import React, {Component} from 'react';

class createUpdate extends Component {

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