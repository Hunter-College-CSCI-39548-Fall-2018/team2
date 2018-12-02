import React, {Component} from 'react';

class Subgoal extends Component {

    render() {
        return (
            <section className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                <header className="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white">

                </header>
                <div className="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone">
                    <div className="mdl-card__supporting-text">
                        <h4>This is a subgoal template</h4>
                        Here I'm going to talk about how close I'm getting towards my main goal! :) Ideally I can
                        also update, delete, or mark this as completed as well. This will be totally flexible and
                        whatever is programatically easier/ a better user experience.
                    </div>
                </div>
            </section>

        );
    }
}

export default Subgoal;