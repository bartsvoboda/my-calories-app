import React, { Component } from 'react';
import axios from 'axios';

export default class CaloriesDiary extends Component {
    render(){
        return(
            <div>
                <h1>Dziennik Kalori</h1>
                <p>{this.props.dailyCalories}</p>
            </div>
        );
    }
}
