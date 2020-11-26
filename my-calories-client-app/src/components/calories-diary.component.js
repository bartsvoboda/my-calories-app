import React, { Component } from 'react';


export default class CaloriesDailyDiary extends Component {
    constructor(props){
        super(props);

        this.state = {
            RequiredCalories: this.props.dailyCalories
        }
    }
    render(){
        return(
            <div>
                <h1>Dzisiejszy bilans kaloryczny</h1>
                <br/>
                <p>{this.props.dailyCalories}</p>
                <p>{this.state.RequiredCalories}</p>
            </div>
        );
    }
}
