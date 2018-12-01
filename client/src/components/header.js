import React, {Component} from 'react';
import Goals from './goals.js';
import '../css/goals.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clickedButton: this.props.filter
        };

        this.filterCategoryPriority = this.filterCategoryPriority.bind(this);
        this.filterCategoryAll = this.filterCategoryAll.bind(this);
        this.filterCategoryCompleted = this.filterCategoryCompleted.bind(this);
        this.buttonStyle = this.buttonStyle.bind(this);
    }

    updateCards(filterCategory) {
        this.setState({clickedButton: filterCategory});

        fetch('/filter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filter: filterCategory }),
        });

        fetch('/goals').then((response) => response.json())
            .then((res) => {
                this.props.updateGoals(res.goals);
            })
            .catch(error => console.warn(error));
    };

    filterCategoryAll() {
        const newState = 'All';
        this.updateCards(newState);
    }

    filterCategoryPriority() {
        const newState = 'Priority';
        this.updateCards(newState);
    }

    filterCategoryCompleted() {
        const newState = 'Completed';
        this.updateCards(newState);
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