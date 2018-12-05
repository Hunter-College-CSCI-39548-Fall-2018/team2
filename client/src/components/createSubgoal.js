import React, {Component} from 'react';
import {post} from 'axios';

class createSubgoal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            completed: false,
        };

        this.fileInput = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async e => {
        e.preventDefault();
        const url = '/subgoal/create';
        const formData = new FormData();

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        formData.append('title', this.state.title);
        formData.append('description', this.state.description);

        post(url, formData, config).then(() =>{
            window.location.reload();
        }).catch(err =>{
            console.log(err);
        });
    };

    // Updates the state of component with data entered into form
    handleInputChange(event) {
        alert('hi');
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    render() {
        return (
            <div id="createSubgoal" className="add-goal modal-body">
                <form onSubmit={this.handleSubmit} ref={el => this.form = el}>
                    <div className="mdl-textfield mdl-js-textfield">
                        <input id="subgoalTitle" className="mdl-textfield__input" name='title' type="text"
                               onChange={this.handleInputChange} value={this.state.title}/>
                        <label className="mdl-textfield__label">Subgoal Title</label>
                    </div>
                    <div className="mdl-textfield mdl-js-textfield" >
                        <textarea className="mdl-textfield__input" name='description'
                               onChange={this.handleInputChange} rows="3"/>
                        <label className="mdl-textfield__label">Subgoal Description</label>
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