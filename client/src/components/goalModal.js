import React, {Component} from 'react';
import '../css/index.css';
import '../css/goals.css';

class GoalModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            imageValue: ''
        };

        this.fileInput = React.createRef();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Handles submission of form data and posts it to backend
    handleSubmit = async e => {
        e.preventDefault();

        const response = await fetch('/login', {
            mode: 'no-cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.username,
                description: this.state.password,
                imageValue: this.fileInput.current.files[0]
            }),
        });
        const body = await response.text();
        this.setState({responseToPost: body});
    };

    // Updates the state of component with data entered into form
    handleInputChange(event) {

        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    // ToDo: Get rid of some of these divs and make this more clean (do it for other files too)
    render() {
        return (
            <div>
                {/** Floating action button **/}
                <div className="fab" data-toggle="modal" data-target="#addGoalModal">
                    <i id="add-button" className="material-icons"> add </i>
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
                                        <input type="submit" value="Add Item" className="btn btn-primary"/>
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