'use strict';

import React from 'react';


export class ContactDetailsPage extends React.Component {

    state = {
        chartData: null
    }

    render() {
        return this.state.chartData && 
            
            <main>
                <h1>Chart</h1>
                <pre>{this.state.chartData}</pre>
            </main>
    }

    async componentDidMount() {
        const CHART_DATE_STORAGE_KEY = 'chart_data';
        var chartData = localStorage.getItem(CHART_DATE_STORAGE_KEY);
        if (!chartData) {
            chartData = await fetch('https://api.blockchain.info/charts/market-cap?format=json').then(data => data.json().then(res => res));
            localStorage.setItem(CHART_DATE_STORAGE_KEY, chartData);
        }
        this.setState({chartData});
    }
}