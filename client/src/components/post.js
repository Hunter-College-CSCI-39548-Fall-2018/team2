import React, { Component } from 'react';
import '../css/subgoals.css';
import logo from './cactus.jpg';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            postDescription: this.props.goalDescription,
            postImage: this.props.goalImage
        };

        this.handleEditClick = this.handleEditClick.bind(this);
        this.editPost = this.editGoal.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    uploadFile(event) {
        let file = event.target.files[0];
        this.setState({ goalImage: file.name });

        if (file) {
            let data = new FormData();
            data.append('file', file);
        }
    }

    render() {
        return (
            <section className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                <div className="mdl-card mdl-cell mdl-cell--12-col">
                    <div className="mdl-card__supporting-text">
                        <h4> Goal Update Template</h4>
                        <img id="post-image" src={logo} alt="" />
                        Today I did something super awesome that I'm going to use this post to talk about!
                        This post will ideally allow you to click to zoom on the picture, have an option
                        to edit and delete it as well. Programming is awesome! Hello world! :)
                    </div>

                </div>
            </section>
        );
    }
}

export default Post;