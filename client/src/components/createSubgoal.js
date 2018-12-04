import React, {Component} from 'react';

class createSubgoal extends Component {

    render() {
        return (
            <div id="createSubgoal" className="add-goal modal-body">
                <form>
                    <div className="mdl-textfield mdl-js-textfield">
                        <input className="mdl-textfield__input" name='title' type="text"/>
                        <label className="mdl-textfield__label">Goal Title</label>
                    </div>
                    <div className="mdl-textfield mdl-js-textfield">
                        <input className="mdl-textfield__input" name='description'
                               type="text"/>
                        <label className="mdl-textfield__label">Goal Description</label>
                    </div>
                    <div className="modal-footer">
                    <input type="submit" value="submit" className='rkmd-btn-toggled'
                           data-dismiss="modal"/>
                </div>
                </form>
            </div>
        );
    }
}

export default createSubgoal;