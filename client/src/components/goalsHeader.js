import React, {Component} from 'react';
import '../css/goals.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
           button: ''
        };

        this.filterCategoryPriority = this.filterCategoryPriority.bind(this);
        this.filterCategoryAll = this.filterCategoryAll.bind(this);
        this.filterCategoryCompleted = this.filterCategoryCompleted.bind(this);
        this.updateCards = this.updateCards.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            button: nextProps.filter
        });
    }

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

    updateCards(filterCategory) {
        fetch('/filter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filter: filterCategory }),
        }).then(() => fetch('/goals').then((response) => response.json())
            .then((res) => {
                this.props.updateGoals(res.goals);
                this.setState({
                    button: filterCategory
                });
            }).catch(error => console.warn(error)));
    };

    render() {
        return (
            <div id='header'>
                <h1 id='application-title'> Bloom </h1>
                <h2 id='application-description'> Welcome!</h2>
                <button onClick={this.filterCategoryAll} className={this.state.button === 'All' ? 'rkmd-btn-toggled' : 'rkmd-btn'}>All</button>
                <button onClick={this.filterCategoryPriority} className={this.state.button === 'Priority' ? 'rkmd-btn-toggled' : 'rkmd-btn'}>Priority</button>
                <button onClick={this.filterCategoryCompleted} className={this.state.button === 'Completed' ? 'rkmd-btn-toggled' : 'rkmd-btn'} >Completed
                </button>
                <hr className='divider'/>
            </div>
        );
    }
}

export default Header;