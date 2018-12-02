import React, {Component} from 'react';

class SubgoalsHeader extends Component {

    render() {
        return (
            <div className="mdl-demo mdl-color--grey-100 mdl-color-text--grey-700 mdl-base">
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header mdl-layout__header--scroll mdl-color--primary">
                    <div className="mdl-layout--large-screen-only mdl-layout__header-row" id="imageArea">
                        <h3 id="goalInfo">Goal Title and Description</h3>
                    </div>
                    <div className="mdl-layout--large-screen-only mdl-layout__header-row" id="addAnchor">
                    </div>
                    <div id="tab-strip" className="mdl-layout__tab-bar mdl-color--primary-dark">
                        <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-shadow--4dp mdl-color--accent" id="add">
                            <i className="material-icons" role="presentation">add</i>
                            <span className="visuallyhidden">Add</span>
                        </button>
                    </div>
                </header>
            </div>
            </div>
        );
    }
}

export default SubgoalsHeader;