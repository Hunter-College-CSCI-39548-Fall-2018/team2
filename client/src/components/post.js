import React, {Component} from 'react';
import '../css/subgoals.css';
import logo from '../assets/cactus.jpg';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            title: props.postTitle,
            description: props.postDescription,
        };

    }

    // Used to initialize the component with the previous state
    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.id,
            title: nextProps.postTitle,
            description: nextProps.postDescription,
        });
    }

    render() {
        return (
            <section className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                <div className="mdl-card mdl-cell mdl-cell--12-col">
                    <div className="mdl-card__supporting-text">
                        <div className="parentContainer dropdownHeader">
                            <span><i id="dropdownIcon" className="material-icons">more_vert</i></span>
                            <span>
                                <select className="dropdown mdl-textfield__input" name="dropDown">
                                    <option value="Delete">Delete</option>
                                    <option value="Complete">Share</option>
                                </select>
                            </span>
                        </div>
                        <div className="postHeader"><span id="postTitle">{this.state.title}</span><span className="date">Date Here</span></div>
                        <img id="post-image" src={logo} alt=""/>
                        {this.state.description}
                    </div>

                </div>
            </section>
        );
    }
}

export default Post;