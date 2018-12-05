import React, {Component} from 'react';
import '../css/subgoals.css';
import CreateSubgoal from './createSubgoal';
import CreateUpdate from './createUpdate';
import SubgoalMenu from './subgoalMenu';

class SubgoalsHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editPanel: 'Default',
            title: ''
        };

        this.displayForm = this.displayForm.bind(this);
        this.displayBackButton = this.displayBackButton.bind(this);
        this.displayTitle = this.displayTitle.bind(this);
        this.switchForm = this.switchForm.bind(this);
        this.toMain = this.toMain.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.goalTitle
        });
    }

    displayForm() {
        let editPanel = this.state.editPanel;

        if (editPanel === 'createSubgoal') {
            return (<CreateSubgoal/>);
        } else if (editPanel === 'createUpdate') {
            return (<CreateUpdate/>);
        } else {
            return (<SubgoalMenu switchForm={this.switchForm}/>);
        }
    }

    toMain() {
        return(<SubgoalMenu switchForm={this.switchForm}/>);
    }

    displayBackButton(){
        let editPanel = this.state.editPanel;

        if (editPanel === 'createSubgoal' || editPanel === 'createUpdate') {
            return (<i className="material-icons" onClick={this.toMain}>arrow_back</i>);
        }
    }

    displayTitle(){
        let editPanel = this.state.editPanel;

        if (editPanel === 'createSubgoal') {
            return (<h5 className="modal-title">Add A Subgoal</h5>);
        } else if (editPanel === 'createUpdate') {
            return (<h5 className="modal-title">Add An Update</h5>);
        } else {
            return (<h5 className="modal-title">Main Menu</h5>);
        }
    }

    switchForm(formChoice) {
        this.setState({
            editPanel: formChoice
        });
    }

    render() {
        return (
            <div className="mdl-demo mdl-color--grey-100 mdl-color-text--grey-700 mdl-base">
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                    <header className="mdl-layout__header mdl-layout__header--scroll mdl-color--primary">
                        <div className="mdl-layout--large-screen-only mdl-layout__header-row">
                        </div>
                        <div className="mdl-layout--large-screen-only mdl-layout__header-row" id="imageArea">
                            <h3 id="goalInfo">{this.state.title}</h3>
                        </div>
                        <div className="mdl-layout--large-screen-only mdl-layout__header-row" id="addAnchor">
                        </div>
                        <div id="tab-strip" className="mdl-layout__tab-bar mdl-color--primary-dark">
                            <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect
                         mdl-button--colored mdl-shadow--4dp mdl-color--accent" id="add"
                                    data-toggle="modal" data-target={'#editGoalModal'}>
                                <i className="material-icons" role="presentation">add</i>
                                <span className="visuallyhidden">Add</span>
                            </button>
                        </div>
                    </header>


                    <div className="modal fade" id="editGoalModal" tabIndex="-1" role="dialog"
                         aria-labelledby="addGoalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">

                                {/** Modal header **/}
                                <div className="modal-header">
                                    <span>
                                        {this.displayBackButton()}
                                        {this.displayTitle()}
                                    </span>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                {/** Modal body **/}
                                <div id="modal-body" className="modal-body">
                                    {this.displayForm()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubgoalsHeader;