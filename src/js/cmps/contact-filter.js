import React from 'react';

export default class ContantFilter extends React.Component {
    state = {
        filterBy: {
            searchStr: ''
        }
    }

    setFilter = (ev, prop) => {
        ev.preventDefault();
        var filterBy = this.state.filterBy;
        filterBy[prop] = ev.target.value;
        this.setState({filterBy});

        ev.preventDefault();
        this.props.setFilter(JSON.parse(JSON.stringify(this.state.filterBy)));
    }

    updateFilter = (ev, prop) => {
        ev.preventDefault();
        var filterBy = this.state.filterBy;
        filterBy[prop] = ev.target.value;
        this.setState({filterBy});
    }

    render() {
        return <form onSubmit={() => false}>
                <input onChange={ev => this.setFilter(ev, 'searchStr')} type="text" placeholder="Search"/>
            </form>
    }
}