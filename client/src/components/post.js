import React, {Component} from 'react';
import {Image} from 'cloudinary-react';
import '../css/subgoals.css';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            title: props.postTitle,
            description: props.postDescription,
            date: props.postDate,
            image: props.postImage
        };

    }

    // Used to initialize the component with the previous state
    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.id,
            title: nextProps.postTitle,
            description: nextProps.postDescription,
            date: nextProps.postDate,
            image:nextProps.postImage
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
                        <div className="postHeader"><span id="postTitle">{this.state.title}</span><span className="date">{this.state.date}</span></div>
                        <Image cloudName="bloom-goal-setting" publicId={this.state.image}/>
                        {this.state.description}
                    </div>
                </div>
            </section>
        );
    }
}

export default Post;