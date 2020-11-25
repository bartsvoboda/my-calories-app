import React, { Component } from 'react';


export default class CaloriesDailyDiary extends Component {
    render(){
        return(
            <div>
                <h1>Dzisiejszy bilans kaloryczny</h1>
                <br/>
                <p>{this.props.dailyCalories}</p>
            </div>
        );
    }
}
