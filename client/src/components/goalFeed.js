import React, {Component} from 'react';
import Header from './subgoalsHeader';
import NavBar from './navbar';
import Subgoal from './subgoal';
import Post from './post';
import {get} from 'axios';

class GoalFeed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            goalId: this.props.goalId,
            goalTitle: '',
            goalDescription: '',
            posts: [],
            subgoals: [],
            feed: []
        };

        this.displayFeed = this.displayFeed.bind(this);
        this.callApiPosts = this.callApiPosts.bind(this);
        this.callApiSubgoals = this.callApiSubgoals.bind(this);
    }

    componentDidMount() {

        this.setState({
            goalId: this.props.location.state.goalId,
            goalTitle: this.props.location.state.goalTitle,
            goalDescription: this.props.location.state.goalDescription,
        });

        let feedPosts = [];

        this.callApiSubgoals()
            .then(result => {
                this.setState({subgoals: result.subgoals});
                feedPosts.push.apply(feedPosts, result.subgoals);
            }).catch(err => console.log(err));


        this.callApiPosts()
            .then(result => {
                this.setState({posts: result.posts});
                feedPosts.push.apply(feedPosts, result.posts);
            }).catch(err => console.log(err));

        // Merge the feeds somehow

        this.setState({
            feed: feedPosts
        });
    }

    callApiSubgoals = async () => {

        return get('/subgoals/fetch', {
            params: {
                id: this.props.location.state.goalId
            }}).then(response => {
            // returning the data here allows the caller to get it through another .then(...)
            return response.data;
        });

    };

    callApiPosts = async () => {

        return get('/posts/fetch', {
            params: {
                id: this.props.location.state.goalId
            }}).then(response => {
            // returning the data here allows the caller to get it through another .then(...)
            return response.data;
        });
    };

    displayFeed(props) {
        const numPosts = this.state.feed.length;
        alert(numPosts);
        if (numPosts === 0) {
            return (<p id='no-goals'> Your feed is currently empty. Add an update by clicking the '+' button!</p>);
        } else {
            return (
                <ul className='goal-cards'> {
                    this.state.feed.map((post, index) => {
                        if (post.structure === 'Subgoal') {
                            return (<Post key={index} id={post._id} postTitle={post.title}
                                          postDescription={post.description} postImage={post.img}/>);
                        } else {
                            return (<Subgoal key={index} id={post._id} subgoalTitle={post.title}
                                             subgoalDescription={post.description} subgoalImage={post.img}
                                             completed={post.completed}/>);
                        }
                    })}
                </ul>
            )
        }
    };

    render() {
        return (
            <div className="mdl-demo mdl-color--grey-100 mdl-color-text--grey-700 mdl-base">
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                    <NavBar/>
                    <Header goalTitle={this.state.goalTitle} goalId={this.state.goalId}/>
                    <main className="mdl-layout__content">
                        <div className="mdl-layout__tab-panel is-active" id="overview">
                            {this.displayFeed(this.state.feed)}
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default GoalFeed;