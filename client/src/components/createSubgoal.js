import React, {Component} from 'react';
import {post} from 'axios';

class createSubgoal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            completed: false,
            id: this.props.goalId
        };

        this.fileInput = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.goalTitle,
            id: nextProps.goalId
        });
    }

    handleSubmit = async e => {
        e.preventDefault();

        const url = '/subgoal/create';

        let data = JSON.stringify({
            title: this.state.title,
            description: this.state.description,
            id: this.state.id
        });

        post(url, data, {
            headers: {
                'Content-Type': 'application/json',
            }
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
                           data-dismiss="modal" onClick={() => {
                        this.form.dispatchEvent(new Event('submit'))}} />
                </div>
                </form>
            </div>
        );
    }
}

export default createSubgoal;