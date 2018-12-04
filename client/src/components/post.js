import React, {Component} from 'react';
import '../css/subgoals.css';
import logo from '../assets/cactus.jpg';

class Post extends Component {

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
                        <div className="postHeader"><span id="postTitle"> Goal Update Template</span><span className="date">Date Here</span></div>
                        <img id="post-image" src={logo} alt=""/>
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