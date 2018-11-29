import React, {Component} from 'react';
import '../css/goals.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clickedButton: 'All',
            userName: ''
        };

        this.filterCategoryPriority = this.filterCategoryPriority.bind(this);
        this.filterCategoryAll = this.filterCategoryAll.bind(this);
        this.filterCategoryCompleted = this.filterCategoryCompleted.bind(this);
        this.buttonStyle = this.buttonStyle.bind(this);
    }

    filterCategoryAll(props) {
        this.setState({clickedButton: 'All'});

    }

    filterCategoryPriority(props) {
        this.setState({clickedButton: 'Priority'});
    }

    filterCategoryCompleted(props) {
        this.setState({clickedButton: 'Completed'});
    }

    buttonStyle(props) {
        if (props === this.state.clickedButton) {
            return 'rkmd-btn-toggled';
        } else {
            return 'rkmd-btn';
        }
    }

    render() {
        return (
            <div id='header'>
                <h1 id='application-title'> Bloom </h1>
                <h2 id='application-description'> Welcome!</h2>
                <button className={this.buttonStyle('All')} onClick={this.filterCategoryAll}>All</button>
                <button className={this.buttonStyle('Priority')} onClick={this.filterCategoryPriority}>Priority</button>
                <button className={this.buttonStyle('Completed')} onClick={this.filterCategoryCompleted}>Completed
                </button>
                <hr className='divider'/>
            </div>
        );
    }
}

export default Header;