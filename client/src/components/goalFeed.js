import React, {Component} from 'react';
import Header from './subgoalsHeader';
import NavBar from './navbar';
import Subgoal from './subgoal';
import Post from './post';


class Subgoals extends Component {

    render() {
        return (
            <div className="mdl-demo mdl-color--grey-100 mdl-color-text--grey-700 mdl-base">
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <NavBar/>
                <Header/>
                <main className="mdl-layout__content">
                    <div className="mdl-layout__tab-panel is-active" id="overview">
                        <Subgoal/>
                        <Post/>
                    </div>
                </main>
            </div>
            </div>
        );
    }
}

export default Subgoals;