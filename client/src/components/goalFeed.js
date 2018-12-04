import React, {Component} from 'react';
import Header from './subgoalsHeader';
import NavBar from './navbar';
import Subgoal from './subgoal';
import Post from './post';

class GoalFeed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            goalTitle: '',
            posts: [],
            subgoals: [],
        };

        this.displayFeed = this.displayFeed.bind(this);
        this.callApiPosts = this.callApiPosts.bind(this);
        this.callApiSubgoals = this.callApiSubgoals.bind(this);
    }

    componentDidMount() {

        let feedPosts = [];

        this.callApiSubgoals()
            .then(res => {
                feedPosts.concat(res.subgoals);
            }).catch(err => console.log(err));

        this.callApiPosts()
            .then(res => {
                feedPosts.concat(res.posts);
            }).catch(err => console.log(err));

        // Merge the feeds somehow

        this.setState({
            feed: feedPosts
        });
    }

    callApiSubgoals = async () => {
        const response = await fetch('/subgoals');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    callApiPosts = async () => {
        const response = await fetch('/posts');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    displayFeed(props) {
        const numPosts = this.state.posts.length;
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
                    <Header/>
                    <main className="mdl-layout__content">
                        <div className="mdl-layout__tab-panel is-active" id="overview">
                            {this.displayFeed(this.state.posts)}
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default GoalFeed;